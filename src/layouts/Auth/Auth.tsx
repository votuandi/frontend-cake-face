import React, { useEffect, useRef, useState } from 'react'
import useStyles from './Auth.styles'
import { Box, Button, CircularProgress, useMediaQuery } from '@mui/material'
import AppAdminMenu from '@/components/AppAdminMenu'
import theme from '@/assets/theme'

type MainProps = {
  children: React.ReactNode
}

const Main = (props: MainProps) => {
  const { children } = props

  const { classes } = useStyles({
    params: {},
  })

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  )
}

export default Main
