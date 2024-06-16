/* eslint-disable @next/next/no-img-element */
import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box } from '@mui/material'
import useStyles from './AppBanner.styles'
import router from 'next/router'
import { gotoPage } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { EXAMPLE_BANNER_IMAGES } from '@/assets/static/banner.static'
import { bannerApi } from '@/utils/api'
import { BANNER_ITEM_TYPE } from '@/utils/api/banner'

type IProps = {}

const SLIDER_SETTING = {
  dots: false,
  arrows: false,
  infinite: true,
  // speed: 5000,
  autoplay: true,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // cssEase: 'linear',
}

const AppFooter = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const { classes } = useStyles()

  const [isVertical, setIsVertical] = useState<boolean>(window.innerWidth / window.innerHeight < 1)
  const [bannerList, setBannerList] = useState<string[]>(['/img/banner/banner_ex_03.jpg'])

  const updateWindowSize = () => {
    setIsVertical(window.innerWidth / window.innerHeight < 1)
  }

  let GetBannerList = async () => {
    try {
      let res = await bannerApi.getByDevice(isVertical ? 'mobile' : 'pc')
      if (res.data.status) {
        setBannerList((res.data.params as BANNER_ITEM_TYPE[]).map((x) => x.path))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize)
    return () => {
      window.removeEventListener('resize', updateWindowSize)
    }
  }, [])

  useEffect(() => {
    GetBannerList()
  }, [isVertical])

  return (
    <Box className={classes.root}>
      <Slider {...SLIDER_SETTING}>
        {bannerList.map((banner, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${banner.includes('\\') ? banner.replaceAll('\\', '/') : banner})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          )
        })}
      </Slider>
    </Box>
  )
}

export default React.forwardRef(AppFooter)
