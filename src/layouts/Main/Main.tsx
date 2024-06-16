import AppHeader from '@/components/AppHeader'
import React, { useEffect, useRef, useState } from 'react'
import useStyles from './Main.styles'
import AppFooter from '@/components/AppFooter'
import { Box } from '@mui/material'

type MainProps = {
  children: React.ReactNode
}

const Main = (props: MainProps) => {
  const { children } = props
  const headerRef = useRef(null)
  const footerRef = useRef(null)

  const { classes } = useStyles({
    params: {},
  })

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
          width: '100vw',
        }}
      >
        {children}
      </Box>
      <AppFooter />
    </Box>
  )
}

export default Main
