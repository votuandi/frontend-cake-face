/* eslint-disable @next/next/no-img-element */
import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box, useMediaQuery } from '@mui/material'
import useStyles from './AppBanner.styles'
import router from 'next/router'
import { gotoPage, isMobile } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { EXAMPLE_BANNER_IMAGES } from '@/assets/static/banner.static'
import theme from '@/assets/theme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getBanners } from '@/store/banner/banner.action'

type IProps = {}

const SLIDER_SETTING = {
  dots: false,
  arrows: false,
  infinite: true,
  // speed: 5000,
  autoplay: true,
  autoplaySpeed: 4500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // cssEase: 'linear',
}

const AppFooter = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const { classes } = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down(600))
  const dispatch = useDispatch()
  const { banners } = useSelector((state: RootState) => state.banner)

  const [isVertical, setIsVertical] = useState<boolean>(window.innerWidth / window.innerHeight < 1)
  const [bannerList, setBannerList] = useState<string[]>([...EXAMPLE_BANNER_IMAGES])

  const updateWindowSize = () => {
    setIsVertical(window.innerWidth / window.innerHeight < 1)
  }

  const fetchData = () => {
    dispatch(getBanners())
  }

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize)
    return () => {
      window.removeEventListener('resize', updateWindowSize)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box className={classes.root}>
      <Slider {...SLIDER_SETTING}>
        {banners.map((banner, index) => {
          return (
            <Box
              key={index}
              sx={{
                width: '100%',
                aspectRatio: isMobile ? 1.6 : 2.4,
                // backgroundImage: `url(${banner.includes('\\') ? banner.replaceAll('\\', '/') : banner})`,
                backgroundImage: `url(${banner.path})`,
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
