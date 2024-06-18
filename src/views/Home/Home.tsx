/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import useStyles from './Home.style'
import { Box, Container } from '@mui/material'
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
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        marginTop: '60px',
      }}
    >
      {/* <Box sx={{ width: '100%', aspectRatio: 3.4, background: 'red' }}></Box> */}
      <AppBanner />
    </Container>
  )
}
