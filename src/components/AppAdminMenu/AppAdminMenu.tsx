import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box, Button, Typography } from '@mui/material'
import useStyles from './AppAdminMenu.styles'
import router, { useRouter } from 'next/router'
import { ADMIN_MENU, MENU, MENU_ITEM_TYPE } from '@/utils/constants/menu.constant'
import { gotoPage, localStorageAvailable } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import theme from '@/assets/theme'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'

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
        backgroundColor: '#51000b',
        displayL: 'flex',
        flexDirection: 'column',
        // padding: '16px 12px',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
        // borderRight: '1px solid #2b303b',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          fontFamily: 'Mulish',
          color: 'white',
          textAlign: 'center',
          backgroundColor: '#62000D',
          py: '36px',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '18px',
        }}
      >
        KY ANH NGUYEN
      </Box>
      {ADMIN_MENU.map((item, index) => {
        return (
          <Box
            sx={{
              padding: '16px 24px',
              backgroundColor: router.pathname.split('/').reverse()[0] === item.path.split('/').reverse()[0] ? '#880012' : '#51000b',
              color: router.pathname.split('/').reverse()[0] === item.path.split('/').reverse()[0] ? '#fff' : '#ccc',
              fontWeight: router.pathname.split('/').reverse()[0] === item.path.split('/').reverse()[0] ? 800 : 400,
              fontFamily: 'Mulish',
              cursor: 'pointer',

              '&:hover': {
                backgroundColor: '#ffffffa7',
                color: '#880012',
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
