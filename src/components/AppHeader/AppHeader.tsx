import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box, Button, Typography, Container, Grid, TextField } from '@mui/material'
import useStyles from './AppHeader.styles'
import router, { useRouter } from 'next/router'
import { MENU, MENU_ITEM_TYPE } from '@/utils/constants/menu.constant'
import { gotoPage, localStorageAvailable } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import theme from '@/assets/theme'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { useIsMounted } from 'usehooks-ts'
import { getCurrentUserInfo } from '@/store/user/user.action'
import { cleanCookie } from '@/utils/helpers/cookie'

type IProps = {}

const AppHeader = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1200))
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentUserInfo } = useSelector((state: RootState) => state.user)

  const handleSignOut = () => {
    cleanCookie()
    router.reload()
  }

  const handleSignIn = () => {
    router.push('/sign-in')
  }

  const handleAuthEvent = () => {
    if (!!currentUserInfo) handleSignOut()
    else handleSignIn()
  }

  const { classes } = useStyles({
    params: {},
  })

  useEffect(() => {
    if (!isMounted()) {
      dispatch(getCurrentUserInfo())
    }
  }, [])
  let isMounted = useIsMounted()

  return (
    <Box className={classes.root}>
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          padding: '8px 0',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Open Sans',
        }}
      >
        <Grid container sx={{ width: '100%', height: '100%' }}>
          <Grid item xs={3} md={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center', '& img': { width: '80%', maxWidth: '110px' } }}>
            <img src="/image/abaso-full-logo.png" alt="" />
          </Grid>
          <Grid item xs={6} md={8} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '80%', maxWidth: '480px', position: 'relative', '& input': { padding: '8px 14px' } }}>
              <TextField variant="outlined" placeholder="Nhập để tìm kiếm" fullWidth></TextField>
            </Box>
          </Grid>
          <Grid item xs={3} md={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
            <Typography onClick={handleAuthEvent} sx={{ fontSize: '14px', fontWeight: 600, color: '#1a1a1a', cursor: 'pointer' }}>
              {!!currentUserInfo ? 'Đăng xuất' : 'Đăng nhập'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default React.forwardRef(AppHeader)
