import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box, Grid, useMediaQuery, Typography, Link } from '@mui/material'
import useStyles from './AppFooter.styles'
import router from 'next/router'
import { gotoPage } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import theme from '@/assets/theme'

type IProps = {}

const AppFooter = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const { classes } = useStyles()
  const isMd = useMediaQuery(theme.breakpoints.down(900))
  const isSm = useMediaQuery(theme.breakpoints.down(600))

  return (
    <Box
      sx={{
        width: '100vw',
        padding: isMd ? '16px 16px 80px 16px' : '60px 40px 80px 40px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#61c0af',
        color: '#fff',
      }}
    >
      <Grid container sx={{ width: '100%', maxWidth: '1200px' }}>
        <Grid
          item
          // xs={12}
          // md={3}
          xs={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& img': {
              width: '100%',
              maxWidth: '300px',
              height: 'auto',
            },
          }}
        >
          <img src="/image/timbanh.com-logo.png" alt="" />
        </Grid>
        <Grid
          item
          // xs={12}
          // md={9}
          xs={9}
          sx={{
            color: '#fff',
            fontSize: isSm ? '14px' : isMd ? '24px' : '36px',
            // padding: isMd ? '12px 0' : '56px 0 0 12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'start',
            paddingLeft: '12px',
            '& p': {
              paddingBottom: isSm ? '6px' : '12px',
              borderBottom: isSm ? '1px solid #fff' : '2px solid #fff',
            },
          }}
        >
          <p>
            Nơi mỗi chiếc bánh là một <b>tác phẩm</b>
            <br /> và là nơi tự do <b>sáng tạo bánh theo cách riêng</b>.
          </p>
        </Grid>
        <Grid
          xs={4}
          sx={{
            fontWeight: 600,
            fontSize: isSm ? '14px' : isMd ? '20px' : '36px',
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Link href="https://timbanh.com" sx={{ color: '#fff !important', textDecoration: 'none' }} target="_blank">
            Timbanh.com
          </Link>
        </Grid>
        <Grid
          xs={4}
          sx={{
            fontWeight: 600,
            fontSize: isSm ? '14px' : isMd ? '20px' : '36px',
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Link href="https://maubanh.com" sx={{ color: '#fff !important', textDecoration: 'none' }} target="_blank">
            Maubanh.com
          </Link>
        </Grid>
        <Grid
          xs={4}
          sx={{
            fontWeight: 600,
            fontSize: isSm ? '14px' : isMd ? '20px' : '36px',
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Link href="https://maubanh.vn" sx={{ color: '#fff !important', textDecoration: 'none' }} target="_blank">
            Maubanh.vn
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: isMd ? '8px' : '20px',
            margin: '20px 0',
            borderRadius: '12px',
            backgroundColor: '#ccebe5',
            color: '#34a199',
            fontSize: isSm ? '14px' : '20px',
            lineHeight: 1.3,
            textAlign: 'justify',
          }}
        >
          <p>
            <b>Timbanh.com</b> là thiên đường của những chiếc bánh, nơi bạn có thể tìm thấy vô vàn mẫu bánh kem và bánh sinh nhật độc đáo theo mọi chủ đề và sở thích. Đặc biệt hơn,
            Timbanh.com còn cho phép bạn thỏa sức sáng tạo, thiết kế mẫu bánh theo ý tưởng riêng, biến những điều ước thành hiện thực trên từng chiếc bánh
          </p>
        </Grid>
      </Grid>
    </Box>
  )
}

export default React.forwardRef(AppFooter)
