/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
// import Slider from 'react-slick'
import useStyles from './Account.style'
import { Box, Button, Container, LinearProgress, TextField, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getCurrentUserInfo } from '@/store/user/user.action'
import { cleanCookie } from '@/utils/helpers/cookie'
import { getSettings } from '@/store/setting/setting.action'
import Head from 'next/head'

export default function Contact() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentUserInfo } = useSelector((state: RootState) => state.user)
  const { settings } = useSelector((state: RootState) => state.setting)

  const [icon, setIcon] = useState<string>('')
  const [logo, setLogo] = useState<string>('')
  const [seoContent, setSeoContent] = useState<string>('')

  const handleSignOut = () => {
    if (confirm('Bạn thật sự muốn đăng xuất?')) {
      cleanCookie()
      router.push('/')
    }
  }

  useEffect(() => {
    if (!isMounted()) {
      dispatch(getCurrentUserInfo())
      dispatch(getSettings())
    }
  }, [])

  useEffect(() => {
    if (!currentUserInfo) {
      router.push('/sign-in')
    }
  }, [currentUserInfo])

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
      {' '}
      <Head>
        <title>{`${currentUserInfo?.name ? currentUserInfo?.name : 'Tài khoản'} - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com`}</title>
        <link rel="icon" href={icon} />
        <meta name="description" content={seoContent} />
        <meta property="og:title" content={`${currentUserInfo?.name ? currentUserInfo?.name : 'Tài khoản'} - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com`} />
        <meta property="og:description" content={seoContent} />
        <meta property="og:image" content={logo} />
      </Head>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          padding: '16px',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            margin: '80px auto 0 auto',
            width: '100%',
            maxWidth: '520px',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            alignItems: 'start',
            fontFamily: 'Open Sans',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              borderBottom: '1px solid #1a1a1a20',
              padding: '20px',
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: '24px', color: '#26787c' }}>{currentUserInfo?.name}</Typography>
            <Typography sx={{ fontWeight: 400, fontSize: '16px', color: '#1a1a1acc' }}>@{currentUserInfo?.userName}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '20px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography onClick={handleSignOut} sx={{ fontWeight: 500, fontSize: '16px', color: '#f2464d', cursor: 'pointer' }}>
              Đăng xuất
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
