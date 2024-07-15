/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted, useOnClickOutside } from 'usehooks-ts'
import useStyles from './AdminTrendy.style'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Head from 'next/head'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { formatDate, gotoPage } from '@/utils/helpers/common'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import theme from '@/assets/theme'
import MenuIcon from '@mui/icons-material/Menu'
import AppAdminMenu from '@/components/AppAdminMenu'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getCakeFaceList } from '@/store/cakeFace/cakeFace.action'
import { getCategoryList } from '@/store/category/category.action'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DownloadIcon from '@mui/icons-material/Download'
import { QUILL_FORMAT, QUILL_MODULES } from '@/utils/constants/common.constant'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { cakeFaceApi } from '@/utils/api'
import parse from 'html-react-parser'
import Link from 'next/link'
import UndoIcon from '@mui/icons-material/Undo'
import { CAKE_FACE_ITEM_TYPE } from '@/utils/api/cakeFace'

export default function AdminTrendy() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600))
  const isSmallScreenMenu = useMediaQuery(theme.breakpoints.down(900))
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const { cakeFaceList, cakeFaceListError, cakeFaceListLoading, cakeFaceTotalPage, cakeFaceTotalPageActive } = useSelector((state: RootState) => state.cakeFace)
  const { categoryList, categoryListLoading } = useSelector((state: RootState) => state.category)

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  let fetchCategoryList = async () => {
    dispatch(getCategoryList({ params: {} }))
  }

  let fetchCakeFaceList = async () => {
    dispatch(
      getCakeFaceList({
        params: {
          categoryId: selectedCategoryId,
          sortBy: 'isTrendy',
          isActive: '1',
          limit,
          page,
        },
      })
    )
  }

  let handleToggleTrendy = async (item: CAKE_FACE_ITEM_TYPE) => {
    setIsLoading(true)
    try {
      let res = await cakeFaceApi.updateCakeFace(item.id, {
        params: {
          isTrendy: item.isTrendy ? '0' : '1',
        },
      })
      if (res.data.status) {
        // alert('Cập nhật thành công ✅')
        fetchCakeFaceList()
        setIsLoading(false)
      } else {
        alert('Cập nhật không thành công ⛔')
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      alert('Cập nhật không thành công ⛔')
      setIsLoading(false)
    }
  }

  let FetchData = async () => {
    await fetchCakeFaceList()
    await fetchCategoryList()
  }

  let closeMenuPopup = () => {
    setIsShowMenu(false)
  }

  useOnClickOutside(menuRef, closeMenuPopup)

  useEffect(() => {
    if (isMounted()) return
    FetchData()
  }, [])

  useEffect(() => {
    if (!isMounted()) return
    FetchData()
  }, [locale])

  useEffect(() => {
    fetchCakeFaceList()
  }, [selectedCategoryId])

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
            pb: '80px',
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#fff',
              boxShadow: 2,
              padding: '24px 24px 40px 24px',
              borderRadius: '8px',
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
            >
              <Typography
                variant="headerSemi35"
                sx={{
                  fontFamily: 'Open Sans',
                  fontWeight: 900,
                  fontSize: '36px',
                  color: '#26787c',
                }}
              >
                Danh sách nổi bật
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                maxWidth: '1200px',
                mx: 'auto',
                gap: '12px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'end',
                  alignItems: 'center',
                  fontFamily: 'Open Sans',
                }}
              >
                <Select
                  sx={{
                    backgroundColor: '#fff',
                    width: '200px',
                    '& .MuiFormHelperText-root': {
                      backgroundColor: 'transparent',
                      color: 'red',
                    },
                    '& .MuiSelect-select': { padding: '6px 12px' },
                  }}
                  defaultValue="_"
                  onChange={(e: any) => setSelectedCategoryId(e.target.value === '_' ? '' : e.target.value)}
                >
                  {[{ id: '_', name: 'Tất cả' }, ...categoryList].map((category) => (
                    <MenuItem
                      sx={{
                        fontFamily: 'Open Sans',
                      }}
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Grid container spacing="12px">
                {cakeFaceList.map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      onClick={() => handleToggleTrendy(item)}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        borderRadius: '8px',
                        border: '1px solid #26787c20',
                        padding: '4px',
                        cursor: 'pointer',
                        height: '72px',
                        backgroundColor: item?.isTrendy ? '#26787c80' : '#fff',
                        gap: '10px',
                        fontFamily: 'Open Sans',

                        '&:hover': {
                          boxShadow: 3,
                          backgroundColor: '#26787c20',
                        },

                        '& .thumbnail': {
                          width: '64px',
                          height: '64px',
                          borderRadius: '8px',
                        },
                      }}
                    >
                      <img className="thumbnail" src={item?.thumbnail} alt="" />
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Typography className="text-1-line" sx={{ color: '#26787c', fontSize: '24px', fontWeight: 600 }}>
                          {item?.name}
                        </Typography>
                        <Typography className="text-1-line" sx={{ color: '#26787c', fontSize: '14px', fontWeight: 400 }}>
                          {item?.category?.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Pagination sx={{ marginLeft: 'auto' }} onChange={(e, v) => setPage(v)} count={cakeFaceTotalPage} size="small" />
            </Box>
          </Container>
          {isLoading && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#00000080',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
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
