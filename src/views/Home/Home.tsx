/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './Home.style'
import { Box } from '@mui/material'
import AppBanner from '@/components/AppBanner'

const TAB_TITLES = ['News', 'Promotion']

export default function Home() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  let FetchData = async () => {}

  useEffect(() => {
    if (isMounted()) return
    FetchData()
  }, [])

  useEffect(() => {
    if (!isMounted()) return
    FetchData()
  }, [locale])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f0ed',
        color: 'black',
      }}
    >
      <AppBanner />
      <Box
        sx={{
          height: '150vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Coming soon
      </Box>
    </Box>
  )
}
