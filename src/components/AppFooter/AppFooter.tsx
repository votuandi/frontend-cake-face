import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box } from '@mui/material'
import useStyles from './AppFooter.styles'
import router from 'next/router'
import { FOOTER, MENU } from '@/utils/constants/menu.constant'
import { gotoPage } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

type IProps = {}

const AppFooter = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const { classes } = useStyles()

  return (
    <Box
      sx={{
        width: '100vw',
        padding: '12px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
      }}
    >
      Footer
    </Box>
  )
}

export default React.forwardRef(AppFooter)
