/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './AdminUpdateCakeFace.style'
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
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Head from 'next/head'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined'
import FilePresentIcon from '@mui/icons-material/FilePresent'
import { convertToEmbed, convertToEmbedPreview, formatDate } from '@/utils/helpers/common'
import parse from 'html-react-parser'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { ARTICLE_CONTENT_TYPES, ARTICLE_CONTENT_WIDTHS } from '@/types/common'
import { ARTICLE_CONTENT_LIST, ARTICLE_CONTENT_WIDTH_LIST, QUILL_FORMAT, QUILL_MODULES } from '@/utils/constants/common.constant'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import theme from '@/assets/theme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getCakeFaceDetail } from '@/store/cakeFace/cakeFace.action'
import { getCategoryList } from '@/store/category/category.action'
import Link from 'next/link'
import { Label, UndoOutlined } from '@mui/icons-material'
import { cakeFaceApi } from '@/utils/api'
import { UPDATE_CAKE_FACE_DTO } from '@/utils/api/cakeFace'
import AdminOption from './components/AdminOption'
import AdminConfigFiles from './components/AdminConfigFiles'

export default function AdminUpdateCakeFace() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const router = useRouter()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600))
  const dispatch = useDispatch()
  const { cakeFaceDetail } = useSelector((state: RootState) => state.cakeFace)
  const { categoryList } = useSelector((state: RootState) => state.category)

  const [cakeFaceId, setCakeFaceId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [detail, setDetail] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPath, setThumbnailPath] = useState<string | null>(null)
  const [configFile, setConfigFile] = useState<File | null>(null)
  const [isActive, setActive] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tabIndex, setTabIndex] = useState<number>(0)

  let handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  let handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let selectedFile = e.target.files[0]
      setThumbnailFile(selectedFile)
      // Preview the selected image
      let reader = new FileReader()
      reader.onload = () => {
        setThumbnailPath(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  let handleConfigFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let selectedFile = e.target.files[0]
      setConfigFile(selectedFile)
    }
  }

  let handleUndoPickThumbnail = () => {
    setThumbnailFile(null)
    setThumbnailPath(null)
  }

  let handleUndoPickConfigFile = () => {
    setConfigFile(null)
  }

  let handleUndoAll = () => {
    if (confirm('Bạn có muốn hoàn tác toàn bộ thay đổi?')) fetchOriginalData()
  }

  let fetchOriginalData = () => {
    if (!!cakeFaceDetail) {
      setName(cakeFaceDetail.name)
      setDetail(cakeFaceDetail.detail)
      setContent(cakeFaceDetail.content)
      setActive(cakeFaceDetail.isActive)
      setCategoryId(cakeFaceDetail?.category?.id ? cakeFaceDetail?.category?.id.toString() : '')
      setThumbnailFile(null)
      setThumbnailPath(null)
      setConfigFile(null)
    }
  }

  useEffect(() => {
    console.log(cakeFaceDetail?.category?.id)

    console.log(categoryId)
  }, [categoryId])

  let handleUpdate = async () => {
    if (confirm('Xác nhận lưu thay đổi?')) {
      setIsLoading(true)
      let payload: UPDATE_CAKE_FACE_DTO = {
        params: {},
      }
      if (name !== cakeFaceDetail?.name) {
        payload.params.name = name
      }
      if (detail !== cakeFaceDetail?.detail) {
        payload.params.detail = detail
      }
      if (content !== cakeFaceDetail?.content) {
        payload.params.content = content
      }
      if (isActive !== cakeFaceDetail?.isActive) {
        payload.params.content = content ? '1' : '0'
      }
      if (categoryId !== cakeFaceDetail?.category?.id) {
        payload.params.categoryId = categoryId
      }
      if (!!thumbnailFile) {
        payload.params.thumbnail = thumbnailFile
      }
      if (!!configFile) {
        payload.params.configFile = configFile
      }
      try {
        let res = await cakeFaceApi.updateCakeFace(cakeFaceId, payload)
        if (res.data.status) {
          alert('Cập nhật thành công ✅')
          fetchCakeFaceDetail()
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
  }

  const fetchCakeFaceDetail = (id?: string) => {
    dispatch(getCakeFaceDetail(id ? id : cakeFaceId))
  }

  const fetchCategoryList = () => {
    dispatch(
      getCategoryList({
        params: {},
      })
    )
  }

  const FetchData = async (id?: string) => {
    fetchCakeFaceDetail(id)
    fetchCategoryList()
  }

  useEffect(() => {
    if (isMounted()) return
    let { slug } = router.query
    if (typeof slug === 'string') {
      setCakeFaceId(slug)
      FetchData(slug)
    }
  }, [])

  useEffect(() => {
    fetchOriginalData()
  }, [cakeFaceDetail])

  useEffect(() => {
    console.log(cakeFaceDetail)
  }, [cakeFaceDetail])

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
            position: 'relative',
            fontFamily: 'Open Sans',
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="headerSemi35"
              sx={{
                fontWeight: 900,
                fontSize: '36px',
                color: '#26787c',
              }}
            >
              Chỉnh sửa mẫu bánh
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="basic tabs example">
                  <Tab label="Nội dung" />
                  <Tab label="Tùy chọn" />
                  <Tab label="File cấu hình" />
                </Tabs>
              </Box>
            </Box>
            {tabIndex === 0 ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    marginTop: '40px',
                  }}
                >
                  <TextField
                    id="new-name"
                    label="Tên mẫu bánh"
                    variant="outlined"
                    fullWidth
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',

                      '& fieldset': {
                        borderColor: '#0596A6',
                        // backgroundColor: '#fff',
                      },

                      '& .MuiFormLabel-root': {
                        color: '#0596A6',
                      },
                    }}
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                  <TextField
                    id="new-detail"
                    label="Giới thiệu"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',

                      '& fieldset': {
                        borderColor: '#0596A6',
                        // backgroundColor: '#fff',
                      },

                      '& .MuiFormLabel-root': {
                        color: '#0596A6',
                      },
                    }}
                    value={detail}
                    onChange={(e: any) => setDetail(e.target.value)}
                  />
                  <Box sx={{ width: '100%', backgroundColor: '#fff', color: '#000', padding: '4px', border: '1px solid #0596A6', borderRadius: '8px' }}>
                    <InputLabel
                      sx={{
                        color: '#0596A6',
                        paddingLeft: '8px',
                      }}
                      id="category-label"
                    >
                      Nhập nội dung mô tả cho mặt bánh
                    </InputLabel>
                    <ReactQuill theme="snow" modules={QUILL_MODULES} formats={QUILL_FORMAT} value={content} onChange={(value: any) => setContent(value)} />
                  </Box>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{
                        color: '#0596A6',
                        backgroundColor: '#fff',
                      }}
                      id="category-label"
                    >
                      Chọn danh mục
                    </InputLabel>
                    {!!categoryId && (
                      <Select
                        sx={{
                          backgroundColor: '#fff',
                          '& .MuiFormHelperText-root': {
                            backgroundColor: 'transparent',
                            color: 'red',
                          },
                        }}
                        labelId="category-label"
                        id="category-select"
                        defaultValue={categoryId}
                        onChange={(e: any) => setCategoryId(e.target.value)}
                      >
                        {categoryList.map((category) => (
                          <MenuItem
                            sx={{
                              fontFamily: 'Open Sans',
                              fontWeight: category.isActive ? 600 : 300,
                            }}
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    {!categoryId && (
                      <Select
                        sx={{
                          backgroundColor: '#fff',
                          '& .MuiFormHelperText-root': {
                            backgroundColor: 'transparent',
                            color: 'red',
                          },
                        }}
                        labelId="category-label"
                        id="category-select"
                        defaultValue={categoryId}
                        onChange={(e: any) => setCategoryId(e.target.value)}
                      >
                        {categoryList.map((category) => (
                          <MenuItem
                            sx={{
                              fontFamily: 'Open Sans',
                              fontWeight: category.isActive ? 600 : 300,
                            }}
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                  <Grid container spacing={'12px'}>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '6px',
                        '& img': {
                          height: '400px',
                          borderRadius: '8px',
                        },
                      }}
                    >
                      <input type="file" accept="image/*" onChange={handleThumbnailFileChange} style={{ display: 'none' }} id="upload-image" />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                      >
                        <label htmlFor="upload-image">
                          <Button variant="contained" component="span">
                            Chọn ảnh đại diện
                          </Button>
                        </label>
                        <Button variant="contained" onClick={handleUndoPickThumbnail}>
                          <UndoOutlined sx={{ height: '20px' }} />
                        </Button>
                      </Box>

                      <img src={thumbnailPath ? thumbnailPath : cakeFaceDetail?.thumbnail} alt="Selected" style={{ marginTop: '10px', maxWidth: '240px', height: 'auto' }} />
                      {thumbnailFile && <Typography sx={{ color: '#1a1a1a' }}>{thumbnailFile.name}</Typography>}
                    </Grid>
                    {/* <Grid
                      item
                      xs={12}
                      md={6}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'center',
                        gap: '20px',
                      }}
                    >
                      <input type="file" onChange={handleConfigFileChange} style={{ display: 'none' }} id="upload-config" />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                      >
                        <label htmlFor="upload-config">
                          <Button variant="contained" component="span">
                            Chọn file cấu hình
                          </Button>
                        </label>
                        <Button variant="contained" onClick={handleUndoPickConfigFile}>
                          <UndoOutlined sx={{ height: '20px' }} />
                        </Button>
                      </Box>

                      {configFile ? (
                        <Typography sx={{ color: '#1a1a1a' }}>{configFile.name}</Typography>
                      ) : (
                        <Link href={cakeFaceDetail?.configFilePath ? cakeFaceDetail?.configFilePath : ''}>
                          <Typography sx={{ color: 'blue', fontSize: '14px' }}>File hiện tại</Typography>
                        </Link>
                      )}
                      <FormControl sx={{}}>
                        <FormLabel
                          sx={{
                            color: '#0596A6',
                          }}
                        >
                          Kích hoạt
                        </FormLabel>
                        <Switch checked={isActive} onClick={() => setActive((x) => !x)}></Switch>
                      </FormControl>
                    </Grid> */}
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    marginTop: '40px',
                  }}
                >
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ fontSize: '20px', minWidth: '160px', backgroundColor: '#93B775', '&:hover': { backgroundColor: '#7F9C20' } }}
                    onClick={handleUpdate}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ fontSize: '20px', minWidth: '160px', backgroundColor: '#fa4653', '&:hover': { backgroundColor: '#c53b42' } }}
                    onClick={handleUndoAll}
                  >
                    Hoàn tác
                  </Button>
                </Box>
              </>
            ) : tabIndex === 1 ? (
              <AdminOption cakeFaceId={cakeFaceId} />
            ) : (
              <AdminConfigFiles cakeFaceId={cakeFaceId} />
            )}
          </Container>
          {isLoading && (
            <Box
              sx={{
                width: '100%',
                height: '100vh',
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
