import React, { useEffect, useRef, useState } from 'react'
import useStyles from './Admin.styles'
import { Box, Button, CircularProgress, useMediaQuery } from '@mui/material'
import AppAdminMenu from '@/components/AppAdminMenu'
import theme from '@/assets/theme'

type MainProps = {
  children: React.ReactNode
}

const Main = (props: MainProps) => {
  const { children } = props
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(900))

  const { classes } = useStyles({
    params: {},
  })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}
    >
      {!isSmallScreen && <AppAdminMenu />}
      {/* {isShowLoading && (
        <Box
          sx={{
            position: 'fixed',
            width: '100%',
            height: '100vh',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#7c320a2a',
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )} */}
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Main
