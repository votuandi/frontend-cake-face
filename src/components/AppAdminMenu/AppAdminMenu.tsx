import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box, Button, Typography } from '@mui/material'
import useStyles from './AppAdminMenu.styles'
import router, { useRouter } from 'next/router'
import { ADMIN_MENU } from '@/utils/constants/menu.constant'
import { gotoPage } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

type IProps = {}

const AppAdminMenu = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const { classes } = useStyles({
    params: {},
  })

  return (
    <Box
      sx={{
        width: '360px',
        height: '100vh',
        // backgroundColor: '#26787c10',
        displayL: 'flex',
        flexDirection: 'column',
        // padding: '16px 12px',
        boxShadow: 'rgba(106, 188, 182, 0.2) 0px 19px 38px, rgba(106, 188, 182, 0.2) 0px 15px 12px',
        borderRight: '1px solid rgba(106, 188, 182, 0.3)',
        overflow: 'auto',
        fontFamily: 'Open Sans',
      }}
    >
      <Box
        sx={{
          color: 'white',
          textAlign: 'center',
          // backgroundColor: '#26787c50',
          py: '36px',
          // cursor: 'pointer',
          fontWeight: 500,
          fontSize: '18px',

          '& .logo': {
            width: '60%',
          },
        }}
      >
        <Link href="/">
          <img className="logo" src="/image/abaso-full-logo.png" alt="" />
        </Link>
      </Box>
      {ADMIN_MENU.map((item, index) => {
        return (
          <Box
            sx={{
              padding: '16px 24px',
              backgroundColor: router.pathname.split('/').reverse()[0] === item.path.split('/').reverse()[0] ? 'rgb(106, 188, 182, 0.6)' : '#fff',
              color: router.pathname.split('/').reverse()[0] === item.path.split('/').reverse()[0] ? '#1f5254' : '#1f5254',
              fontWeight: router.pathname.split('/').reverse()[0] === item.path.split('/').reverse()[0] ? 800 : 400,
              cursor: 'pointer',

              '&:hover': {
                backgroundColor: 'rgb(106, 188, 182, 0.2)',
                color: '#1f5254',
                fontWeight: router.pathname.split('/').reverse()[0] === item.path.split('/').reverse()[0] ? 800 : 600,
              },
            }}
            key={index}
            onClick={() => gotoPage(`/admin${item.path}`)}
          >
            {item.title}
          </Box>
        )
      })}
    </Box>
  )
}

export default React.forwardRef(AppAdminMenu)
