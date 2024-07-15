/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted, useOnClickOutside } from 'usehooks-ts'
import useStyles from './AdminConfigFiles.style'
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  Grid,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import AppAdminMenu from '@/components/AppAdminMenu'
import Head from 'next/head'
import { cakeFaceApi, categoryApi, optionApi } from '@/utils/api'
import { CATEGORY_ITEM_TYPE, UPDATE_CATEGORY_DTO } from '@/utils/api/category'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import theme from '@/assets/theme'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getCategoryList } from '@/store/category/category.action'
import { getOptionList } from '@/store/option/option.action'
import DeleteIcon from '@mui/icons-material/Delete'

import React from 'react'
import { UPDATE_OPTION_DTO } from '@/utils/api/option'
import { getCakeFaceDetail } from '@/store/cakeFace/cakeFace.action'
import Link from 'next/link'

type Props = { cakeFaceId: string }

const AdminConfigFiles = ({ cakeFaceId }: Props) => {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const isSmallScreenMenu = useMediaQuery(theme.breakpoints.down(900))
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const { cakeFaceDetail } = useSelector((state: RootState) => state.cakeFace)

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const GetDetail = async () => {
    dispatch(getCakeFaceDetail(cakeFaceId))
  }

  let FetchData = async () => {
    await GetDetail()
  }

  let closeMenuPopup = () => {
    setIsShowMenu(false)
  }

  let handleDelete = async (index: number) => {
    if (confirm('Xác nhận xóa file?'))
      try {
        setIsLoading(true)
        let res = await cakeFaceApi.deleteConfigFile(cakeFaceId, index.toString())
        if (res.data.status) {
          alert('Xóa thành công!')
          await GetDetail()
          setIsLoading(false)
        } else {
          alert('Xóa thất bại!')
          setIsLoading(false)
        }
      } catch (error) {
        alert('Xóa thất bại!')
        console.log(error)
        setIsLoading(false)
      }
  }

  let handleAddFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0)
      try {
        setIsLoading(true)
        let res = await cakeFaceApi.addConfigFiles(cakeFaceId, [...e.target.files] as File[])
        console.log(res)

        if (res.status === 204) {
          alert('Thêm thành công!')
          await GetDetail()
          setIsLoading(false)
        } else {
          alert('Thêm thất bại!')
          setIsLoading(false)
        }
      } catch (error) {
        alert('Thêm thất bại!')
        console.log(error)
        setIsLoading(false)
      }
  }

  useOnClickOutside(menuRef, closeMenuPopup)

  useEffect(() => {
    if (!isMounted()) {
      FetchData()
    }
  }, [])

  useEffect(() => {
    if (!isMounted()) return
    FetchData()
  }, [locale])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            padding: '24px',
            overflow: 'auto',
            backgroundColor: '#f4f0ed',
            gap: '36px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            fontFamily: 'Open Sans',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          ></Box>
          <Box sx={{ width: '99%', mx: 'auto' }}>
            {cakeFaceDetail &&
              cakeFaceDetail.configFilePath.split(',').map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                    borderRadius: '4px',

                    '&:hover': {
                      backgroundColor: '#26787c20',
                    },
                  }}
                >
                  <Link target="_blank" href={item.replaceAll(/\\/g, '/')}>
                    {item.replaceAll(/\\/g, '/').split('/').reverse()[0]}
                  </Link>
                  <DeleteIcon onClick={() => handleDelete(index)} sx={{ color: '#d63a40', cursor: 'pointer' }}></DeleteIcon>
                </Box>
              ))}
            <input multiple type="file" onChange={handleAddFiles} style={{ display: 'none' }} id="upload-config" />
            <label htmlFor="upload-config">
              <Button variant="contained" component="span" sx={{ margin: '20px auto' }}>
                Thêm File khác
              </Button>
            </label>
          </Box>
          {isLoading && (
            <Box
              sx={{
                width: '100%',
                height: '100vh',
                backgroundColor: '#00000080',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 91,
              }}
            >
              <CircularProgress sx={{ width: '80px', height: '80px', color: '#26787c' }} />
            </Box>
          )}
        </Box>
      </main>
    </>
  )
}

export default AdminConfigFiles
