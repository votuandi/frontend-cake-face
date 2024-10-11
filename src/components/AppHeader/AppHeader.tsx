import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box, Button, Typography, Container, Grid, TextField } from '@mui/material'
import useStyles from './AppHeader.styles'
import router, { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import theme from '@/assets/theme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { useIsMounted } from 'usehooks-ts'
import { getCurrentUserInfo } from '@/store/user/user.action'
import { cleanCookie } from '@/utils/helpers/cookie'
import Link from 'next/link'
import { getSettings } from '@/store/setting/setting.action'

type IProps = {}

const AppHeader = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1200))
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentUserInfo } = useSelector((state: RootState) => state.user)
  const { settings } = useSelector((state: RootState) => state.setting)

  const [searchKey, setSearchKey] = useState<string>('')
  const [isTransparent, setTransparent] = useState<boolean>(true)
  const [fullLogo, setFullLogo] = useState<string>('')

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      router.push(`/?name=${searchKey}`)
    }
  }

  const { classes } = useStyles({
    params: {},
  })

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setTransparent(false)
      } else {
        setTransparent(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!isMounted()) {
      dispatch(getCurrentUserInfo())
    }
  }, [])

  useEffect(() => {
    dispatch(getSettings())
  }, [dispatch])

  useEffect(() => {
    let _logo = settings.findLast((x) => x.name === 'full_logo')
    if (!!_logo) setFullLogo(_logo.value)
    else setFullLogo('')
  }, [settings])

  let isMounted = useIsMounted()

  return (
    <Box
      className={classes.root}
      sx={{
        // background: isTransparent ? 'transparent' : 'linear-gradient(#c9ffcb, #e4f9c0)',
        background: isTransparent ? 'transparent' : '#fff',
        boxShadow: isTransparent ? 'none' : 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      }}
    >
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
            <Link href={'/'}>
              <img src={fullLogo} alt="" />
            </Link>
          </Grid>
          <Grid item xs={9} md={10} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
            <Box sx={{ width: '90%', maxWidth: '480px', position: 'relative', '& input': { padding: '8px 14px' } }}>
              <TextField
                sx={{
                  // borderRadius: 'none',
                  // '& .MuiOutlinedInput-root': { borderRadius: '0' },
                  '& fieldset': { background: '#fff', zIndex: -1 },
                }}
                variant="outlined"
                placeholder="Nhập để tìm kiếm"
                fullWidth
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchKey(e.target.value)}
              ></TextField>
            </Box>
          </Grid>
          {/* <Grid item xs={3} md={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
            <Typography onClick={handleAuthEvent} sx={{ fontSize: '14px', fontWeight: 600, color: '#1a4648', cursor: 'pointer' }}>
              {!!currentUserInfo ? 'Đăng xuất' : 'Đăng nhập'}
            </Typography>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  )
}

export default React.forwardRef(AppHeader)
