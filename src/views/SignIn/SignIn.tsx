/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
// import Slider from 'react-slick'
import useStyles from './SignIn.style'
import { Box, Button, Container, LinearProgress, TextField, Typography } from '@mui/material'
import AppBanner from '@/components/AppBanner'
import { Formik, Form, Field, useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { authApi } from '@/utils/api'
import { LOGIN_RESPONSE } from '@/utils/api/auth'
import { getCookie, setCookie } from '@/utils/helpers/cookie'
import { gotoPage } from '@/utils/helpers/common'
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_AVATAR,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_ID,
  COOKIE_USER_NAME,
  COOKIE_USER_ROLE,
  COOKIE_USERNAME,
  MAX_AGE,
} from '@/utils/constants/cookie.constant'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getCurrentUserInfo } from '@/store/user/user.action'
import Cookies from 'universal-cookie'
import { getSettings } from '@/store/setting/setting.action'
import Head from 'next/head'

interface LoginFormValues {
  username: string
  password: string
}

const DEFAULT_INITIAL_VALUE: LoginFormValues = {
  username: '',
  password: '',
}

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
})

export default function SignIn() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const dispatch = useDispatch()
  const { currentUserInfo } = useSelector((state: RootState) => state.user)
  const cookies = new Cookies()
  const { settings } = useSelector((state: RootState) => state.setting)

  const [icon, setIcon] = useState<string>('')
  const [logo, setLogo] = useState<string>('')
  const [seoContent, setSeoContent] = useState<string>('')

  const formik = useFormik({
    initialValues: DEFAULT_INITIAL_VALUE,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let res = await authApi.signIn({
          userName: values.username,
          password: values.password,
        })
        if (res.status === 200 && res.data.status) {
          let loginData: LOGIN_RESPONSE = res.data.params
          setCookie(COOKIE_USERNAME, loginData.user.userName, { maxAge: MAX_AGE })
          setCookie(COOKIE_USER_NAME, loginData.user.name, { maxAge: MAX_AGE })
          setCookie(COOKIE_AVATAR, loginData.user.avatar, { maxAge: MAX_AGE })
          setCookie(COOKIE_USER_ID, loginData.user.id, { maxAge: MAX_AGE })
          setCookie(COOKIE_USER_ROLE, loginData.user.role, { maxAge: MAX_AGE })
          setCookie(COOKIE_ACCESS_TOKEN, loginData.accessToken, { maxAge: MAX_AGE })
          setCookie(COOKIE_REFRESH_TOKEN, loginData.refreshToken, { maxAge: MAX_AGE })

          console.log('loginData', loginData)
          const accessToken = cookies.get(COOKIE_ACCESS_TOKEN)
          console.log(accessToken)

          // gotoPage('/')
        }
        setSubmitting(false)
      } catch (error) {
        alert('Đăng nhập thất bại')
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    if (!isMounted()) {
      dispatch(getCurrentUserInfo())
    }
  }, [])

  useEffect(() => {
    settings.forEach((x) => {
      if (x.name === 'seo_content') setSeoContent(x.value)
      if (x.name === 'ico_logo') setIcon(x.value)
      if (x.name === 'small_logo') setLogo(x.value)
    })
  }, [settings])

  useEffect(() => {
    if (currentUserInfo) {
      setCookie(COOKIE_USERNAME, currentUserInfo.userName, { maxAge: MAX_AGE })
      setCookie(COOKIE_USER_NAME, currentUserInfo.name, { maxAge: MAX_AGE })
      setCookie(COOKIE_AVATAR, currentUserInfo.avatar, { maxAge: MAX_AGE })
      setCookie(COOKIE_USER_ID, currentUserInfo.id, { maxAge: MAX_AGE })
      setCookie(COOKIE_USER_ROLE, currentUserInfo.role, { maxAge: MAX_AGE })
      alert(`Chào ${currentUserInfo.name}!\nBạn đã đăng nhập trước đó!`)
      gotoPage('/')
    }
  }, [currentUserInfo])

  useEffect(() => {
    dispatch(getSettings())
  }, [dispatch])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
    <>
      <Head>
        <title>Đăng nhập - Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com</title>
        <link rel="icon" href={icon} />
        <meta name="description" content={seoContent} />
        <meta property="og:title" content="Đăng nhập - Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com" />
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
            width: '100%',
            maxWidth: '520px',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            textAlign: 'center',
            alignItems: 'center',
            margin: '0 auto',
            fontFamily: 'Open Sans',

            '& .logo': {
              width: '66%',
              maxWidth: '200px',
            },
          }}
        >
          <img className="logo" src={logo} alt="" />
          <Typography sx={{ fontWeight: 700, fontSize: '36px', color: '#314856', marginTop: '50px' }}>Đăng Nhập</Typography>
          <Typography sx={{ fontWeight: 400, fontSize: '17px', color: '#5f6a6a', lineHeight: 1.5, marginTop: '4px' }}>Chào mừng bạn đã trở lại</Typography>
          <form onSubmit={formik.handleSubmit} style={{ marginTop: '20px' }}>
            <TextField
              className={classes.textField}
              name="username"
              type="text"
              label="Tên đăng nhập"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              className={classes.textField}
              name="password"
              type="password"
              label="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            {formik.isSubmitting && <LinearProgress />}
            <Button variant="contained" color="primary" type="submit" fullWidth disabled={formik.isSubmitting} style={{ marginTop: '16px', padding: '12px 6px', fontSize: '18px' }}>
              Đăng nhập
            </Button>
          </form>
          <Link href="/forget-password">
            <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#1a1a1a', lineHeight: 1.5, marginTop: '24px' }}>Bạn quên mật khẩu?</Typography>
          </Link>
        </Box>
      </Box>
    </>
  )
}
