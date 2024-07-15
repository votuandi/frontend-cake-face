import AppHeader from '@/components/AppHeader'
import React, { useEffect, useRef, useState } from 'react'
import useStyles from './CFDetail.styles'
import AppFooter from '@/components/AppFooter'
import { Box, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CakeIcon from '@mui/icons-material/Cake'
import CookieIcon from '@mui/icons-material/Cookie'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import PersonIcon from '@mui/icons-material/Person'
import { useRouter } from 'next/router'

type MainProps = {
  children: React.ReactNode
}

const CFDetail = (props: MainProps) => {
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
    </Box>
  )
}

export default CFDetail
