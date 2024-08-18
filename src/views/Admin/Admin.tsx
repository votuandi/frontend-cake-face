/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './Admin.style'
import { Box, CircularProgress } from '@mui/material'
import AppBanner from '@/components/AppBanner'
import AppAdminMenu from '@/components/AppAdminMenu'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getSettings } from '@/store/setting/setting.action'

export default function Admin() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const dispatch = useDispatch()
  const { settings } = useSelector((state: RootState) => state.setting)

  const [icon, setIcon] = useState<string>('')
  const [logo, setLogo] = useState<string>('')
  const [seoContent, setSeoContent] = useState<string>('')

  let FetchData = async () => {
    dispatch(getSettings())
  }

  useEffect(() => {
    if (isMounted()) return
    FetchData()
  }, [])

  useEffect(() => {
    if (!isMounted()) return
    FetchData()
  }, [locale])

  useEffect(() => {
    settings.forEach((x) => {
      if (x.name === 'seo_content') setSeoContent(x.value)
      if (x.name === 'ico_logo') setIcon(x.value)
      if (x.name === 'full_logo') setLogo(x.value)
    })
  }, [settings])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon} />
      </Head>
      <main>
        <Box
          sx={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f4f0ed',
            color: 'black',
          }}
        >
          {/* <AppAdminMenu /> */}
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              overflow: 'auto',
              backgroundColor: '#f4f0ed',
            }}
          ></Box>
        </Box>
      </main>
    </>
  )
}
