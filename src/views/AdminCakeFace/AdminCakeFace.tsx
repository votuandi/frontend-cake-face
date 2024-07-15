/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted, useOnClickOutside } from 'usehooks-ts'
import useStyles from './AdminCakeFace.style'
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

export default function AdminCakeFace() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600))
  const isSmallScreenMenu = useMediaQuery(theme.breakpoints.down(900))
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const { cakeFaceList, cakeFaceListError, cakeFaceListLoading, cakeFaceTotalPage, cakeFaceTotalPageActive } = useSelector((state: RootState) => state.cakeFace)
  const { categoryList, categoryListLoading } = useSelector((state: RootState) => state.category)

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const [isShowNewPopup, setIsShowNewPopup] = useState<boolean>(false)
  const [newName, setNewName] = useState<string>('')
  const [newDetail, setNewDetail] = useState<string>('')
  const [newContent, setNewContent] = useState<string>('')
  const [newCategoryId, setNewCategoryId] = useState<string>('')
  const [newActive, setNewActive] = useState<boolean>(true)
  const [newThumbnailPreview, setNewThumbnailPreview] = useState<string | null>(null)
  const [newThumbnailFileFile, setNewThumbnailNewFile] = useState<File | null>(null)
  const [newConfigFile, setNewConfigFile] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [newInvalid, setNewInvalid] = useState<boolean>(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')

  let handleNewEvent = () => {
    setNewActive(true)
    setNewName('')
    setNewDetail('')
    setNewContent('')
    setNewCategoryId('')
    setNewConfigFile([])
    setNewThumbnailNewFile(null)
    setNewThumbnailPreview('')
    setNewInvalid(false)
    setIsShowNewPopup(true)
  }

  let handleDeleteEvent = async (index: number) => {
    if (confirm('Xác nhận xóa nội dung')) await DeleteCakeFace(cakeFaceList[index].id)
  }

  let DeleteCakeFace = async (id: string) => {
    try {
      setIsLoading(true)
      let res = await cakeFaceApi.deleteById(id)
      if (res.data.status) {
        alert(`Delete successfully!`)
        await fetchCakeFaceList()
        setIsLoading(false)
      } else {
        alert(`Update failed!\n${res.data.message}`)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  let handleNewThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let selectedFile = e.target.files[0]
      setNewThumbnailNewFile(selectedFile)
      // Preview the selected image
      let reader = new FileReader()
      reader.onload = () => {
        setNewThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  let handleNewConfigFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // let selectedFile = e.target.files[0]
      setNewConfigFile([...e.target.files])
    }
  }

  let fetchCategoryList = async () => {
    dispatch(getCategoryList({ params: {} }))
  }

  let fetchCakeFaceList = async () => {
    dispatch(
      getCakeFaceList({
        params: {
          categoryId: selectedCategoryId,
          limit,
          page,
          name: search,
        },
      })
    )
  }

  let CreateCakeFace = async () => {
    try {
      if (newValidate()) {
        setNewInvalid(true)
        return
      }
      setIsLoading(true)
      let res = await cakeFaceApi.createCakeFace({
        params: {
          name: newName,
          detail: newDetail,
          content: newContent,
          thumbnail: newThumbnailFileFile as File,
          configFile: newConfigFile as File[],
          categoryId: newCategoryId,
          isActive: newActive ? '1' : '0',
        },
      })
      if (res.data.status) {
        alert('Tạo mẫu bánh mới thành công!')
        await fetchCakeFaceList()
        setIsLoading(false)
        setIsShowNewPopup(false)
      } else {
        alert(`Tạo mẫu bánh thất bại!\n${res.data.message}`)
        setIsLoading(false)
        setIsShowNewPopup(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  let newValidate = () => {
    let invalid = false
    if (newName.length === 0 || newDetail.length === 0 || newCategoryId?.length === 0 || !newCategoryId || !newConfigFile || !newThumbnailFileFile) invalid = true
    if (!newThumbnailFileFile) {
      alert('Vui lòng chọn ảnh mẫu bánh')
    }
    return invalid
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
  }, [selectedCategoryId, page, search])

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
              gap: '20px',
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: '8px',
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
                  Quản Lý Mẫu Bánh
                </Typography>
              </Box>
              <Button
                startIcon={<AddCircleOutlineIcon sx={{ color: '#fff' }} />}
                sx={{
                  backgroundColor: '#26787c',
                  padding: '12px ',
                  fontFamily: 'Open Sans',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#6abcb6' },
                }}
                onClick={handleNewEvent}
              >
                Thêm mới
              </Button>
            </Box>
            {isShowNewPopup && (
              <Box
                sx={{
                  width: '100%',
                  // maxWidth: '640px',
                  // border: '1px solid #0596A660',
                  borderRadius: '8px',
                  margin: '-24px 0 0 auto',
                  padding: '12px 18px',
                  fontFamily: 'Open Sans',
                  boxShadow: 2,
                  gap: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#0596A610',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#0596A6',
                  }}
                >
                  Tạo mặt bánh mới
                </Typography>
                <TextField
                  id="new-name"
                  label="Tên mặt bánh"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: '12px',
                    color: '#0596A6',

                    '& fieldset': {
                      borderColor: '#0596A6',
                      backgroundColor: '#fff',
                    },

                    '& .MuiFormLabel-root': {
                      color: '#0596A6',
                    },

                    '& .MuiFormHelperText-root': {
                      backgroundColor: 'transparent',
                      color: 'red',
                    },
                    '& input': {
                      zIndex: 1,
                    },
                  }}
                  value={newName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                  helperText={newInvalid && newName.length === 0 && 'Vui lòng nhập tên mặt bánh.'}
                />
                <TextField
                  id="new-detail"
                  label="Lời giới thiệu"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  sx={{
                    borderRadius: '12px',
                    color: '#0596A6',

                    '& fieldset': {
                      borderColor: '#0596A6',
                      backgroundColor: '#fff',
                    },

                    '& .MuiFormLabel-root': {
                      color: '#0596A6',
                    },

                    '& .MuiFormHelperText-root': {
                      backgroundColor: 'transparent',
                      color: 'red',
                    },
                    '& textarea': {
                      zIndex: 1,
                    },
                  }}
                  helperText={newInvalid && newDetail.length === 0 && 'Vui lòng nhập lời giới thiệu'}
                  value={newDetail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDetail(e.target.value)}
                />
                <Box sx={{ width: '100%', backgroundColor: '#fff', color: '#000' }}>
                  <InputLabel
                    sx={{
                      color: '#0596A6',
                      backgroundColor: '#fff',
                    }}
                    id="category-label"
                  >
                    Nhập nội dung mô tả cho mặt bánh
                  </InputLabel>
                  <ReactQuill theme="snow" modules={QUILL_MODULES} formats={QUILL_FORMAT} value={newContent} onChange={(value: any) => setNewContent(value)} />
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
                    defaultValue=""
                    onChange={(e: any) => setNewCategoryId(e.target.value)}
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
                  {newInvalid && (newCategoryId?.length === 0 || !newCategoryId) && (
                    <span style={{ color: 'red', fontFamily: 'Open Sans', fontSize: '16px', margin: '3px 14px 0' }}>Vui lòng chọn danh mục</span>
                  )}
                </FormControl>
                <input type="file" accept="image/*" onChange={handleNewThumbnailFileChange} style={{ display: 'none' }} id="upload-image" />
                <label htmlFor="upload-image">
                  <Button variant="contained" component="span">
                    Chọn ảnh đại diện
                  </Button>
                </label>
                {newThumbnailPreview && <img src={newThumbnailPreview} alt="Selected" style={{ marginTop: '10px', maxWidth: '240px' }} />}
                {newThumbnailFileFile && <Typography sx={{ color: '#1a1a1a' }}>{newThumbnailFileFile.name}</Typography>}
                <input multiple type="file" onChange={handleNewConfigFileChange} style={{ display: 'none' }} id="upload-config" />
                <label htmlFor="upload-config">
                  <Button variant="contained" component="span">
                    Chọn file cấu hình
                  </Button>
                </label>
                {newConfigFile.map((item, index) => (
                  <Typography key={index} sx={{ color: '#1a1a1a' }}>
                    {item.name}
                  </Typography>
                ))}
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#0596A6',
                  }}
                >
                  <FormLabel>Kích hoạt</FormLabel>
                  <Switch checked={newActive} onClick={() => setNewActive((x) => !x)}></Switch>
                </FormControl>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', marginLeft: 'auto' }}>
                  <Button
                    variant="contained"
                    onClick={CreateCakeFace}
                    startIcon={<CheckCircleIcon sx={{ width: '16px', height: '16px' }} />}
                    sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#28BFDF  ', '&:hover': { backgroundColor: '#28BFDF ' } }}
                  >
                    OK
                  </Button>
                  <Button
                    onClick={() => setIsShowNewPopup(false)}
                    variant="contained"
                    color="warning"
                    startIcon={<CancelIcon sx={{ width: '16px', height: '16px' }} />}
                    sx={{ fontSize: '16', fontWeight: 600 }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
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
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'Open Sans',
                }}
              >
                <TextField
                  sx={{ width: '300px', backgroundColor: '#fff', borderRadius: '4px', '& fieldset': { borderRadius: '4px' }, '& input': { padding: '5px 12px' } }}
                  placeholder="Nhận để tìm kiếm"
                  onChange={(e) => setSearch(e.target.value)}
                />
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
              {cakeFaceList.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '8px',
                    border: '1px solid #26787c',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    backgroundColor: '#fff',

                    '&:hover': {
                      boxShadow: 3,
                      backgroundColor: '#26787c20',
                    },
                  }}
                >
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      sx={{
                        borderRadius: '8px',

                        '& img': {
                          width: '100%',
                          height: 'auto',
                          maxHeight: '300px',
                          borderRadius: '8px !important',
                          display: 'flex',
                        },
                      }}
                    >
                      <img style={{ borderRadius: '8px !important' }} src={item.thumbnail} alt="" />
                    </Grid>
                    <Grid
                      item
                      sm={10}
                      xs={12}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        padding: '4px 20px',
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '24px',
                          fontWeight: 700,
                          color: '#1a1a1a',
                        }}
                        className="text-2-line"
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: '#1a1a1a',
                          margin: '4px 0 4px 0',
                        }}
                        className="text-2-line"
                      >
                        {item.detail}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Open Sans',
                          fontSize: '16px',
                          fontWeight: 400,
                          color: '#1a1a1a',
                          margin: '4px 0 4px 0',
                        }}
                        className="text-3-line"
                      >
                        {parse(item?.content)}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'start',
                          alignItems: 'center',
                          width: 'fit-content',
                          gap: '6px',
                          mt: '4px',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            alignItems: 'center',
                            padding: '3px 6px',
                            borderRadius: '8px',
                            backgroundColor: '#2e787b90',
                            width: 'fit-content',
                            gap: '4px',
                          }}
                        >
                          <LocalOfferIcon sx={{ color: '#f8de97', height: '20px' }} />
                          <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 700, color: '#fff' }}>{item?.category?.name}</Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            alignItems: 'center',
                            padding: '3px 6px',
                            borderRadius: '8px',
                            backgroundColor: '#2e787b90',
                            width: 'fit-content',
                            gap: '4px',
                          }}
                        >
                          <VisibilityOutlinedIcon sx={{ color: '#f8de97', height: '20px' }} />
                          <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 700, color: '#fff' }}>{item?.viewAmount}</Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            alignItems: 'center',
                            padding: '3px 6px',
                            borderRadius: '8px',
                            backgroundColor: '#2e787b90',
                            width: 'fit-content',
                            gap: '4px',
                          }}
                        >
                          <DownloadIcon sx={{ color: '#f8de97', height: '20px' }} />
                          <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 700, color: '#fff' }}>{item?.downloadAmount}</Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'start',
                          alignItems: 'center',
                          borderRadius: '8px',
                          width: 'fit-content',
                          gap: '6px',
                          flexWrap: 'wrap',
                          mt: '4px',
                        }}
                      >
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#1a1a1a' }}>Ngày tạo</Typography>
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>{formatDate(new Date(item?.createDate))}</Typography>
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#1a1a1a' }}>bởi</Typography>
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>{item?.createBy}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'start',
                          alignItems: 'center',
                          borderRadius: '8px',
                          width: 'fit-content',
                          gap: '6px',
                          mt: '4px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#1a1a1a' }}>Sửa đổi lần cuối</Typography>
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>{formatDate(new Date(item?.updateDate))}</Typography>
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#1a1a1a' }}>bởi</Typography>
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>{item?.updateBy}</Typography>
                      </Box>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        justifyContent: 'space-between',
                        gap: isSmallScreen ? '20px' : 0,
                      }}
                    >
                      <FormControl
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontFamily: 'Open Sans',
                          fontWeight: 700,
                          color: '#1a1a1a',
                        }}
                      >
                        <FormLabel>Kích hoạt: </FormLabel>
                        <Switch disabled checked={item?.isActive} />
                      </FormControl>
                      <Box
                        sx={{
                          color: '#1a1a1a',
                          fontSize: '16px',
                          fontWeight: 400,
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          alignItems: 'center',
                          columnGap: '8px',
                          gap: '8px',
                          fontFamily: 'Open Sans',
                        }}
                      >
                        <Link href={`/admin/cake-face/${item?.id}`}>
                          <Button
                            variant="contained"
                            startIcon={<BorderColorIcon sx={{ width: '16px', height: '16px' }} />}
                            sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#93B775', '&:hover': { backgroundColor: '#7F9C20  ' } }}
                          >
                            Sửa
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          onClick={() => handleDeleteEvent(index)}
                          startIcon={<DeleteOutlineIcon sx={{ width: '16px', height: '16px' }} />}
                          sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#fa4653', '&:hover': { backgroundColor: '#c53b42  ' } }}
                        >
                          Xóa
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
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
