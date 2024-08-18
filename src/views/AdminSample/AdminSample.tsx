/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useIsMounted, useOnClickOutside } from 'usehooks-ts'
import useStyles from './AdminSample.style'
import { Box, Button, CircularProgress, Container, FormControl, FormLabel, Grid, Pagination, Switch, Tab, Tabs, TextField, Typography, useMediaQuery } from '@mui/material'
import AppAdminMenu from '@/components/AppAdminMenu'
import Head from 'next/head'
import { categoryApi, sampleApi } from '@/utils/api'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import theme from '@/assets/theme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getSampleBackgroundList, getSamplePatternList } from '@/store/sample/sample.action'
import { UPDATE_SAMPLE_DTO } from '@/utils/api/sample'
import { getSettings } from '@/store/setting/setting.action'

export default function AdminCategory() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const isSmallScreenMenu = useMediaQuery(theme.breakpoints.down(900))
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const {
    sampleBackgroundList,
    sampleBackgroundListError,
    sampleBackgroundListLoading,
    sampleBackgroundTotalPage,
    sampleBackgroundTotalPageActive,
    samplePatternList,
    samplePatternListError,
    samplePatternListLoading,
    samplePatternTotalPage,
    samplePatternTotalPageActive,
  } = useSelector((state: RootState) => state.sample)
  const { settings } = useSelector((state: RootState) => state.setting)

  const [icon, setIcon] = useState<string>('')
  const [logo, setLogo] = useState<string>('')
  const [seoContent, setSeoContent] = useState<string>('')
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<number>(-1)
  const [editActive, setEditActive] = useState<boolean>(true)
  const [editName, setEditName] = useState<string>('')
  const [editDetail, setEditDetail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isShowNewPopup, setIsShowNewPopup] = useState<boolean>(false)
  const [newActive, setNewActive] = useState<boolean>(true)
  const [newName, setNewName] = useState<string>('')
  const [newFile, setNewFile] = useState<File | null>(null)
  const [newThumbnailPreview, setNewThumbnailPreview] = useState<string | null>(null)
  const [updateFile, setUpdateFile] = useState<File | null>(null)
  const [updateThumbnailPreview, setUpdateThumbnailPreview] = useState<string | null>(null)
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [tabIndex, setTabIndex] = useState<number>(0)

  let handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setEditIndex(-1)
    setPage(1)
    setSearch('')
    setTabIndex(newValue)
  }

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
    if (confirm('Xác nhận xóa nội dung')) {
      {
        await DeleteSample(tabIndex === 0 ? sampleBackgroundList[index].id.toString() : samplePatternList[index].id.toString())
      }
    }
  }

  let DeleteSample = async (id: string) => {
    try {
      setIsLoading(true)
      if (tabIndex === 0) {
        let res = await sampleApi.deleteSampleBackgroundById(id)
        if (res.data.status) {
          alert(`Delete successfully!`)
          await GetSBList()
          setEditIndex(-1)
          setIsLoading(false)
        } else {
          alert(`Delete failed!\n${res.data.message}`)
          setIsLoading(false)
        }
      } else {
        let res = await sampleApi.deleteSamplePatternById(id)
        if (res.data.status) {
          alert(`Delete successfully!`)
          await GetSPList()
          setEditIndex(-1)
          setIsLoading(false)
        } else {
          alert(`Delete failed!\n${res.data.message}`)
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  let GetSBList = async () => {
    dispatch(getSampleBackgroundList({ params: { limit, page, name: search } }))
  }

  let GetSPList = async () => {
    dispatch(getSamplePatternList({ params: { limit, page, name: search } }))
  }

  let CreateNewSB = async () => {
    try {
      if (newName.length === 0) {
        alert('Vui lòng nhập tên mẫu!')
        return
      }
      if (!newFile) {
        alert('Vui lòng chọn ảnh!')
        return
      }
      setIsLoading(true)
      let params: any = {
        name: newName,
        isActive: newActive ? '1' : '0',
      }
      if (newFile) {
        params = { ...params, image: newFile }
      }
      let res = await sampleApi.createSampleBackground({
        params,
      })
      if (res.data.status) {
        alert('Creating successfully!')
        await GetSBList()
        setIsLoading(false)
        setIsShowNewPopup(false)
      } else {
        alert(`Creating failed!\n${res.data.message}`)
        setIsLoading(false)
        setIsShowNewPopup(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  let CreateNewSP = async () => {
    try {
      if (newName.length === 0) {
        alert('Vui lòng nhập tên mẫu!')
        return
      }
      if (!newFile) {
        alert('Vui lòng chọn ảnh!')
        return
      }
      setIsLoading(true)
      let params: any = {
        name: newName,
        isActive: newActive ? '1' : '0',
      }
      if (newFile) {
        params = { ...params, image: newFile }
      }
      let res = await sampleApi.createSamplePattern({
        params,
      })
      if (res.data.status) {
        alert('Creating successfully!')
        await GetSPList()
        setIsLoading(false)
        setIsShowNewPopup(false)
      } else {
        alert(`Creating failed!\n${res.data.message}`)
        setIsLoading(false)
        setIsShowNewPopup(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  let UpdateSB = async (id: string, updateDTO: UPDATE_SAMPLE_DTO) => {
    try {
      setIsLoading(true)
      console.log(updateDTO)

      let res = await sampleApi.updateSampleBackground(id, updateDTO)
      if (res.data.status) {
        await GetSBList()
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

  let UpdateSP = async (id: string, updateDTO: UPDATE_SAMPLE_DTO) => {
    try {
      setIsLoading(true)
      console.log(updateDTO)

      let res = await sampleApi.updateSamplePattern(id, updateDTO)
      if (res.data.status) {
        await GetSPList()
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
      if (!confirm('Bạn đang chỉnh sửa 1 nội dung khác và chưa lưu. Xác nhận thay đổi mẫu cần chỉnh sửa?')) return
    }
    setEditIndex(index)
    setEditName(tabIndex === 0 ? sampleBackgroundList[index].name : samplePatternList[index].name)
    setEditDetail(tabIndex === 0 ? sampleBackgroundList[index].detail : samplePatternList[index].detail)
    setEditActive(tabIndex === 0 ? sampleBackgroundList[index].isActive : samplePatternList[index].isActive)
    setUpdateFile(null)
    setUpdateThumbnailPreview(tabIndex === 0 ? sampleBackgroundList[index].image : samplePatternList[index].image)
  }

  let handleUpdate = async (index: number) => {
    let updateDTO: UPDATE_SAMPLE_DTO = {
      params: {
        name: editName,
        isActive: editActive ? '1' : '0',
        image: updateFile ? updateFile : undefined,
      },
    }
    console.log(updateDTO)

    if (tabIndex === 0) {
      await UpdateSB(sampleBackgroundList[index].id.toString(), updateDTO)
    }
    if (tabIndex === 1) {
      await UpdateSP(samplePatternList[index].id.toString(), updateDTO)
    }
  }

  let FetchData = async () => {
    await GetSBList()
    await GetSPList()
    dispatch(getSettings())
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

  useEffect(() => {
    if (tabIndex === 0) GetSBList()
    else GetSPList()
  }, [page, search])

  useEffect(() => {
    settings.forEach((x) => {
      if (x.name === 'seo_content') setSeoContent(x.value)
      if (x.name === 'ico_logo') setIcon(x.value)
      if (x.name === 'full_logo') setLogo(x.value)
    })
  }, [settings])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={icon} />
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
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="basic tabs example">
                  <Tab label="Mặt bánh" />
                  <Tab label="Họa tiết" />
                </Tabs>
              </Box>
            </Box>
            {tabIndex === 0 && (
              <>
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
                      fontWeight: 900,
                      fontSize: '36px',
                      color: '#26787c',
                    }}
                  >
                    Quản Lý Mẫu mặt bánh
                  </Typography>
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
                      Tạo mẫu mới
                    </Typography>
                    <TextField
                      id="new-name"
                      label="Tên mẫu"
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
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="upload-image" />
                    <label htmlFor="upload-image">
                      <Button variant="contained" component="span">
                        Chọn ảnh
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
                        onClick={CreateNewSB}
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
                <TextField
                  sx={{ width: '300px', backgroundColor: '#fff', borderRadius: '4px', '& fieldset': { borderRadius: '4px' }, '& input': { padding: '4px 10px' } }}
                  placeholder="Nhận để tìm kiếm"
                  onChange={(e) => setSearch(e.target.value)}
                />
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
                      xs={5}
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
                      Tên mẫu
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
                  {sampleBackgroundList.map((item, index) => (
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
                        xs={5}
                        sx={{
                          color: '#1a1a1a',
                          fontSize: '16px',
                          fontWeight: 600,
                          textAlign: 'left',
                          borderBottom: '1px solid #26787c',
                          borderTop: 'none',
                          padding: '4px 12px',
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
                          padding: '4px 12px',

                          '& img': {
                            height: '80px',
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
                          <img src={item.image} />
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
                          padding: '4px 12px',
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
                <Pagination sx={{ marginLeft: 'auto' }} onChange={(e, v) => setPage(v)} count={sampleBackgroundTotalPage} size="small" />
              </>
            )}

            {tabIndex === 1 && (
              <>
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
                      fontWeight: 900,
                      fontSize: '36px',
                      color: '#26787c',
                    }}
                  >
                    Quản Lý Mẫu họa tiết
                  </Typography>
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
                      Tạo mẫu mới
                    </Typography>
                    <TextField
                      id="new-name"
                      label="Tên mẫu"
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
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="upload-image" />
                    <label htmlFor="upload-image">
                      <Button variant="contained" component="span">
                        Chọn ảnh
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
                        onClick={CreateNewSP}
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
                <TextField
                  sx={{ width: '300px', backgroundColor: '#fff', borderRadius: '4px', '& fieldset': { borderRadius: '4px' }, '& input': { padding: '4px 10px' } }}
                  placeholder="Nhận để tìm kiếm"
                  onChange={(e) => setSearch(e.target.value)}
                />
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
                      xs={5}
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
                      Tên họa tiết
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
                      Ảnh
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
                  {samplePatternList.map((item, index) => (
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
                        xs={5}
                        sx={{
                          color: '#1a1a1a',
                          fontSize: '16px',
                          fontWeight: 600,
                          textAlign: 'left',
                          borderBottom: '1px solid #26787c',
                          borderTop: 'none',
                          padding: '4px 12px',
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
                          padding: '4px 12px',

                          '& img': {
                            height: '80px',
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
                          <img src={item.image} />
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
                          padding: '4px 12px',
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
                <Pagination sx={{ marginLeft: 'auto' }} onChange={(e, v) => setPage(v)} count={sampleBackgroundTotalPage} size="small" />
              </>
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
