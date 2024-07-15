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

export default function Contact() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentUserInfo } = useSelector((state: RootState) => state.user)

  const handleSignOut = () => {
    if (confirm('Bạn thật sự muốn đăng xuất?')) {
      cleanCookie()
      router.push('/')
    }
  }

  useEffect(() => {
    if (!isMounted()) {
      dispatch(getCurrentUserInfo())
    }
  }, [])

  useEffect(() => {
    if (!currentUserInfo) {
      router.push('/sign-in')
    }
  }, [currentUserInfo])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
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
  )
}
