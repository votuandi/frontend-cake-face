/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted, useOnClickOutside } from 'usehooks-ts'
import useStyles from './AdminCategory.style'
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
import { categoryApi } from '@/utils/api'
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

export default function AdminCategory() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const isSmallScreenMenu = useMediaQuery(theme.breakpoints.down(900))
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const { categoryList, categoryListError, categoryListLoading, categoryTotalPage, categoryTotalPageActive } = useSelector((state: RootState) => state.category)
  console.log(categoryList)

  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<number>(-1)
  const [editActive, setEditActive] = useState<boolean>(true)
  const [editName, setEditName] = useState<string>('')
  const [editDetail, setEditDetail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isShowNewPopup, setIsShowNewPopup] = useState<boolean>(false)
  const [newActive, setNewActive] = useState<boolean>(true)
  const [newName, setNewName] = useState<string>('')
  const [newDetail, setNewDetail] = useState<string>('')
  const [newFile, setNewFile] = useState<File | null>(null)
  const [newThumbnailPreview, setNewThumbnailPreview] = useState<string | null>(null)
  const [updateFile, setUpdateFile] = useState<File | null>(null)
  const [updateThumbnailPreview, setUpdateThumbnailPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setNewFile(selectedFile)

      // Preview the selected image
      const reader = new FileReader()
      reader.onload = () => {
        setNewThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpdateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setUpdateFile(selectedFile)

      // Preview the selected image
      const reader = new FileReader()
      reader.onload = () => {
        setUpdateThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  let handleDeleteEvent = async (index: number) => {
    if (confirm('Xác nhận xóa nội dung')) await DeleteCategory(categoryList[index].id)
  }

  let DeleteCategory = async (id: string) => {
    try {
      setIsLoading(true)
      let res = await categoryApi.deleteById(id)
      if (res.data.status) {
        alert(`Delete successfully!`)
        await GetCategoryList()
        setEditIndex(-1)
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

  let GetCategoryList = async () => {
    dispatch(getCategoryList({ params: {} }))
  }

  let CreateNewCategory = async () => {
    try {
      if (newName.length === 0) {
        alert('Vui lòng nhập tên danh mục!')
        return
      }
      setIsLoading(true)
      let params: any = {
        name: newName,
        detail: newDetail,
        isActive: newActive ? '1' : '0',
      }
      if (newFile) {
        params = { ...params, thumbnail: newFile }
      }
      let res = await categoryApi.createCategory({
        params,
      })
      if (res.data.status) {
        alert('Create new category successfully!')
        await GetCategoryList()
        setIsLoading(false)
        setIsShowNewPopup(false)
      } else {
        alert(`Create new category failed!\n${res.data.message}`)
        setIsLoading(false)
        setIsShowNewPopup(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  let UpdateCategory = async (id: string, updateCategoryDto: UPDATE_CATEGORY_DTO) => {
    try {
      setIsLoading(true)
      console.log(updateCategoryDto)

      let res = await categoryApi.updateCategory(id, updateCategoryDto)
      if (res.data.status) {
        await GetCategoryList()
        setEditIndex(-1)
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

  let handleNewEvent = () => {
    setNewActive(true)
    setNewName('')
    setNewFile(null)
    setNewThumbnailPreview('')
    setIsShowNewPopup(true)
  }

  let handleEditEvent = (index: number, isActive: boolean) => {
    if (editIndex != -1) {
      if (!confirm('Bạn đang chỉnh sửa 1 Danh mục khác và chưa lưu. Xác nhận thay đổi Danh mục cần chỉnh sửa?')) return
    }
    setEditIndex(index)
    setEditName(categoryList[index].name)
    setEditDetail(categoryList[index].detail)
    setEditActive(categoryList[index].isActive)
    setUpdateFile(null)
    setUpdateThumbnailPreview(categoryList[index]?.thumbnail)
  }

  let handleUpdate = async (index: number) => {
    let updateCategoryDto: UPDATE_CATEGORY_DTO = {
      params: {
        name: editName,
        detail: editDetail,
        isActive: editActive ? '1' : '0',
        thumbnail: updateFile ? updateFile : undefined,
      },
    }
    console.log(updateCategoryDto)

    await UpdateCategory(categoryList[index].id, updateCategoryDto)
  }

  let FetchData = async () => {
    await GetCategoryList()
  }

  let closeMenuPopup = () => {
    setIsShowMenu(false)
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
          {isShowMenu && isSmallScreenMenu && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 99,
              }}
              ref={menuRef}
            >
              <AppAdminMenu />
            </Box>
          )}
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
                alignItems: 'baseline',
                gap: '8px',
              }}
            >
              {isSmallScreenMenu && (
                <Button
                  sx={{
                    backgroundColor: '#26787c',
                    padding: '12px ',
                    fontWeight: 600,
                    fontSize: '16px',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#7C310A' },
                  }}
                  onClick={() => setIsShowMenu((x) => !x)}
                >
                  <MenuIcon sx={{ color: '#fff' }} />
                </Button>
              )}
              <Typography
                variant="headerSemi35"
                sx={{
                  fontWeight: 900,
                  fontSize: '36px',
                  color: '#26787c',
                }}
              >
                Quản Lý Danh mục
              </Typography>
            </Box>

            <Button
              startIcon={<AddCircleOutlineIcon sx={{ color: '#fff' }} />}
              sx={{
                backgroundColor: '#26787c',
                padding: '12px ',
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
                maxWidth: '640px',
                // border: '1px solid #0596A660',
                borderRadius: '8px',
                margin: '-24px 0 0 auto',
                padding: '12px 18px',
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
                Tạo danh mục mới
              </Typography>
              <TextField
                id="new-name"
                label="Tên danh mục"
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
                value={newName}
                onChange={(e: any) => setNewName(e.target.value)}
              />
              <TextField
                id="new-name"
                label="Thêm chi tiết"
                variant="outlined"
                fullWidth
                multiline
                rows="2"
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
                value={newDetail}
                onChange={(e: any) => setNewDetail(e.target.value)}
              />
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="upload-image" />
              <label htmlFor="upload-image">
                <Button variant="contained" component="span">
                  Chọn ảnh đại diện
                </Button>
              </label>
              {newThumbnailPreview && <img src={newThumbnailPreview} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />}
              {newFile && <Typography sx={{ color: '#1a1a1a' }}>{newFile.name}</Typography>}
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
                  onClick={CreateNewCategory}
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
          <Box sx={{ width: '99%', mx: 'auto' }}>
            <Grid
              container
              sx={{
                width: '100%',
              }}
            >
              <Grid
                item
                xs={1}
                sx={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '16px',
                  border: '1px solid #26787c',
                  padding: '12px 6px',
                  borderTopLeftRadius: '12px',
                  backgroundColor: '#26787c',
                }}
              >
                STT
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderTop: '1px solid #26787c',
                  borderBottom: '1px solid #26787c',
                  padding: '12px 6px',
                  backgroundColor: '#26787c',
                }}
              >
                Tên danh mục
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderTop: '1px solid #26787c',
                  borderBottom: '1px solid #26787c',
                  padding: '12px 6px',
                  backgroundColor: '#26787c',
                }}
              >
                Chi tiết
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderTop: '1px solid #26787c',
                  borderBottom: '1px solid #26787c',
                  padding: '12px 6px',
                  backgroundColor: '#26787c',
                }}
              >
                Ảnh đại diện
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '16px',
                  borderTop: '1px solid #26787c',
                  borderBottom: '1px solid #26787c',
                  padding: '12px 6px',
                  backgroundColor: '#26787c',
                }}
              >
                Kích hoạt
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '16px',
                  border: '1px solid #26787c',
                  padding: '12px 6px',
                  borderTopRightRadius: '12px',
                  backgroundColor: '#26787c',
                }}
              >
                Hành động
              </Grid>
            </Grid>
            {categoryList.map((item, index) => (
              <Grid
                key={index}
                container
                sx={{
                  width: '100%',
                  backgroundColor: index === editIndex ? '#26787c20' : '#fff',

                  '& .MuiGrid-item': {
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                }}
              >
                <Grid
                  item
                  xs={1}
                  sx={{
                    color: '#1a1a1a',
                    fontSize: '16px',
                    fontWeight: 400,
                    textAlign: 'center',
                    border: '1px solid #26787c',
                    borderTop: 'none',
                    padding: '12px 6px',
                  }}
                >
                  {index + 1}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    color: '#1a1a1a',
                    fontSize: '16px',
                    fontWeight: 600,
                    textAlign: 'left',
                    borderBottom: '1px solid #26787c',
                    borderTop: 'none',
                    padding: '12px 24px',
                    justifyContent: 'start !important',
                  }}
                >
                  {editIndex === index ? (
                    <TextField
                      sx={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',

                        '& fieldset': {
                          borderColor: '#26787c',
                        },

                        '& .MuiFormLabel-root': {
                          color: '#26787c',
                        },
                      }}
                      fullWidth
                      value={editName}
                      onChange={(e: any) => setEditName(e.target.value)}
                    ></TextField>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    color: '#1a1a1a',
                    fontSize: '16px',
                    fontWeight: 600,
                    textAlign: 'left',
                    borderBottom: '1px solid #26787c',
                    borderTop: 'none',
                    padding: '12px 24px',
                    justifyContent: 'start !important',
                  }}
                >
                  {editIndex === index ? (
                    <TextField
                      sx={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',

                        '& fieldset': {
                          borderColor: '#26787c',
                        },

                        '& .MuiFormLabel-root': {
                          color: '#26787c',
                        },
                      }}
                      fullWidth
                      value={editDetail}
                      onChange={(e: any) => setEditDetail(e.target.value)}
                    ></TextField>
                  ) : (
                    <span>{item.detail}</span>
                  )}
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    color: '#1a1a1a',
                    fontSize: '16px',
                    fontWeight: 600,
                    textAlign: 'left',
                    borderBottom: '1px solid #26787c',
                    borderTop: 'none',
                    padding: '12px 24px',

                    '& img': {
                      height: '120px',
                      marginX: 'auto',
                    },
                  }}
                >
                  {editIndex === index ? (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <input type="file" accept="image/*" onChange={handleUpdateFileChange} style={{ display: 'none' }} id="upload-image" />
                      <label htmlFor="upload-image">
                        <Button sx={{ backgroundColor: '#26787c', borderRadius: '4px' }} variant="contained" component="span">
                          Chọn ảnh khác
                        </Button>
                      </label>
                      {updateThumbnailPreview && <img src={updateThumbnailPreview} alt="Selected" style={{ marginTop: '10px', width: '100%' }} />}
                      {updateFile && <Typography sx={{ color: '#1a1a1a' }}>{updateFile.name}</Typography>}
                    </Box>
                  ) : (
                    <img src={item.thumbnail} height="120px" />
                  )}
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{
                    color: '#1a1a1a',
                    fontSize: '16px',
                    fontWeight: 600,
                    textAlign: 'left',
                    borderBottom: '1px solid #26787c',
                    borderTop: 'none',
                    padding: '12px 24px',
                  }}
                >
                  {editIndex === index ? (
                    <Switch checked={editActive} onClick={() => setEditActive((x) => !x)}></Switch>
                  ) : (
                    <Switch disabled checked={item.isActive} onChange={() => setEditActive((x) => !x)} />
                  )}
                </Grid>
                <Grid
                  item
                  xs={2}
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
                    border: '1px solid #26787c',
                    borderTop: 'none',
                    padding: '12px 6px',
                    gap: '8px',
                  }}
                >
                  {editIndex === index ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => handleUpdate(index)}
                        startIcon={<CheckCircleIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#28BFDF  ', '&:hover': { backgroundColor: '#28BFDF ' } }}
                      >
                        OK
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setEditIndex(-1)}
                        color="warning"
                        startIcon={<CancelIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600 }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => handleEditEvent(index, item.isActive)}
                        startIcon={<BorderColorIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#93B775', '&:hover': { backgroundColor: '#7F9C20  ' } }}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteEvent(index)}
                        startIcon={<DeleteOutlineIcon sx={{ width: '16px', height: '16px' }} />}
                        sx={{ fontSize: '16', fontWeight: 600, backgroundColor: '#fa4653', '&:hover': { backgroundColor: '#c53b42  ' } }}
                      >
                        Xóa
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            ))}
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
