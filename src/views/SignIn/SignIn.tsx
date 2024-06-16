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
import { COOKIE_ACCESS_TOKEN, COOKIE_AVATAR, COOKIE_REFRESH_TOKEN, COOKIE_USER_ID, COOKIE_USER_NAME, COOKIE_USER_ROLE, COOKIE_USERNAME } from '@/utils/constants/cookie.constant'

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

export default function Contact() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

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
          let maxAge = 7 * 24 * 60 * 60
          setCookie(COOKIE_USERNAME, loginData.user.userName, { maxAge })
          setCookie(COOKIE_USER_NAME, loginData.user.name, { maxAge })
          setCookie(COOKIE_AVATAR, loginData.user.avatar, { maxAge })
          setCookie(COOKIE_USER_ID, loginData.user.id, { maxAge })
          setCookie(COOKIE_USER_ROLE, loginData.user.role, { maxAge })
          setCookie(COOKIE_ACCESS_TOKEN, loginData.accessToken, { maxAge })
          setCookie(COOKIE_REFRESH_TOKEN, loginData.refreshToken, { maxAge })
          gotoPage('/')
        }
        setSubmitting(false)
      } catch (error) {
        alert('Đăng nhập thất bại')
        setSubmitting(false)
      }
    },
  })

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
        <img className="logo" src="/image/abaso-full-logo.png" alt="" />
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
  )
}
