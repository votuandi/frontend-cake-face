import AppHeader from '@/components/AppHeader'
import React, { useEffect, useRef, useState } from 'react'
import useStyles from './Main.styles'
import AppFooter from '@/components/AppFooter'
import { Box, Link, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CakeIcon from '@mui/icons-material/Cake'
import CookieIcon from '@mui/icons-material/Cookie'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import PersonIcon from '@mui/icons-material/Person'
import { useRouter } from 'next/router'
import DrawIcon from '@mui/icons-material/Draw'

type MainProps = {
  children: React.ReactNode
}

const Main = (props: MainProps) => {
  const { children } = props
  const router = useRouter()

  const { classes } = useStyles()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <AppHeader />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          // marginTop: '87px',
        }}
      >
        {children}
      </Box>
      <AppFooter />

      <Box
        sx={{
          width: '100vw',
          height: '72px',
          position: 'fixed',
          left: 0,
          bottom: 0,
          backgroundColor: '#a9d9bb',
          boxShadow: '1px -3px 10px -4px rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '8px',
          alignItems: 'start',
          fontFamily: 'Open Sans',
          textAlign: 'center',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <Link href="/" sx={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer',
              height: '100%',
              borderRadius: '8px',

              '&:hover': {
                backgroundColor: '#629b5c30',
              },
            }}
          >
            <HomeIcon sx={{ fontSize: '32px', color: '#fff' }} />
            <Typography className="text-2-line" sx={{ color: '#fff', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
              Trang chủ
            </Typography>
          </Box>
        </Link>
        {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            flex: 1,
            cursor: 'pointer',
            height: '100%',
            borderRadius: '8px',

            '&:hover': {
              backgroundColor: '#629b5c30',
            },
          }}
        >
          <CakeIcon sx={{ fontSize: '32px', color: '#fff' }} />
          <Typography className="text-2-line" sx={{ color: '#fff', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
            Bánh sinh nhật
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            flex: 1,
            cursor: 'pointer',
            height: '100%',
            borderRadius: '8px',

            '&:hover': {
              backgroundColor: '#629b5c30',
            },
          }}
        >
          <CookieIcon sx={{ fontSize: '32px', color: '#fff' }} />
          <Typography className="text-2-line" sx={{ color: '#fff', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
            Bánh ngọt
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            flex: 1,
            cursor: 'pointer',
            height: '100%',
            borderRadius: '8px',

            '&:hover': {
              backgroundColor: '#629b5c30',
            },
          }}
        >
          <NewspaperIcon sx={{ fontSize: '32px', color: '#fff' }} />
          <Typography className="text-2-line" sx={{ color: '#fff', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
            Tin tức bánh
          </Typography>
        </Box> */}
        <Link href="/sample/create" sx={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer',
              height: '100%',
              borderRadius: '8px',

              '&:hover': {
                backgroundColor: '#629b5c30',
              },
            }}
          >
            <DrawIcon sx={{ fontSize: '32px', color: router.pathname.includes('/sample/create') ? '#0596A6' : '#fff' }} />
            <Typography
              className="text-2-line"
              sx={{ color: router.pathname.includes('/sample/create') ? '#0596A6' : '#fff', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}
            >
              Tạo mẫu
            </Typography>
          </Box>
        </Link>
        <Link href="/account" sx={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer',
              height: '100%',
              borderRadius: '8px',

              '&:hover': {
                backgroundColor: '#629b5c30',
              },
            }}
          >
            <PersonIcon sx={{ fontSize: '32px', color: router.pathname.includes('/account') ? '#0596A6' : '#fff' }} />
            <Typography
              className="text-2-line"
              sx={{ color: router.pathname.includes('/account') ? '#0596A6' : '#fff', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}
            >
              Tài khoản
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  )
}

export default Main
