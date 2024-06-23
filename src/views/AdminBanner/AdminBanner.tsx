/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import Slider from 'react-slick'
import useStyles from './AdminBanner.style'
import { Box, Button, CircularProgress, Grid, Tab, Tabs, Typography } from '@mui/material'
import AppBanner from '@/components/AppBanner'
import AppAdminMenu from '@/components/AppAdminMenu'
import Head from 'next/head'
import { BANNER_ITEM_TYPE } from '@/utils/api/banner'
import { bannerApi } from '@/utils/api'
import { useDispatch } from 'react-redux'
import { setIsShowLoading } from '@/slices/showSlice'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function AdminBanner() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const dispatch = useDispatch()

  const [tabIndex, setTabIndex] = useState<number>(0)
  const [bannerList, setBannerList] = useState<BANNER_ITEM_TYPE[]>([])
  const [isLongerRatio, setIsLongerRatio] = useState<boolean>(false)

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  let GetBannerList = async () => {
    try {
      dispatch(setIsShowLoading(true))
      let res = await bannerApi.getByDevice(tabIndex === 0 ? 'pc' : 'mobile')
      if (res.data.status) {
        setBannerList(res.data.params)
      }
      dispatch(setIsShowLoading(false))
    } catch (error) {
      dispatch(setIsShowLoading(false))
      console.log(error)
    }
  }

  let DeleteBanner = async (id: string) => {
    try {
      dispatch(setIsShowLoading(true))
      let res = await bannerApi.deleteById(id)
      if (res.data.status) {
        GetBannerList()
      } else {
        alert('Xóa ảnh thất bại. Vui lòng thử lại!')
        dispatch(setIsShowLoading(false))
      }
    } catch (error) {
      dispatch(setIsShowLoading(false))
      console.log(error)
    }
  }

  let UpdateBanner = async (id: string, action: 'up' | 'down') => {
    try {
      dispatch(setIsShowLoading(true))
      let res = await bannerApi.updateBanner(id, {
        params: {
          action: action,
        },
      })
      if (res.data.status) {
        setBannerList(res.data.params)
      }
      dispatch(setIsShowLoading(false))
    } catch (error) {
      dispatch(setIsShowLoading(false))
      console.log(error)
    }
  }

  let AddNewBanner = async (image: File) => {
    try {
      let res = await bannerApi.createBanner({
        params: {
          device: tabIndex === 0 ? 'pc' : 'mobile',
          image: image,
        },
      })
      if (res.data.status) {
        return true
      } else return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const handleAddFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      dispatch(setIsShowLoading(true))
      const selectedFiles = e.target.files
      let amountSuccess = 0
      for (let i = 0; i < selectedFiles.length; i++) {
        let file: File = selectedFiles[i]
        let res = await AddNewBanner(file)
        if (res) amountSuccess += 1
        else amountSuccess -= 1
      }
      dispatch(setIsShowLoading(false))
      alert(`Đã thêm ${amountSuccess}/${selectedFiles.length} ảnh vào danh sách banner.`)
      await GetBannerList()
    }
  }

  let FetchData = async () => {
    await GetBannerList()
  }

  useEffect(() => {
    if (isMounted()) return
    FetchData()
  }, [])

  useEffect(() => {
    if (!isMounted()) return
    FetchData()
  }, [locale])

  useEffect(() => {
    GetBannerList()
  }, [tabIndex])

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
        <>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              padding: '24px',
              overflow: 'auto',
              backgroundColor: '#f4f0ed',
              fontFamily: 'Mulish',
            }}
          >
            <Typography
              variant="headerSemi35"
              sx={{
                fontWeight: 900,
                fontSize: '36px',
                color: '#62000D',
              }}
            >
              Chỉnh sửa Banner
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabIndex}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                  sx={{
                    color: '#62000D',
                  }}
                >
                  <Tab label="Bản PC" {...a11yProps(0)} />
                  <Tab label="Bản Mobile" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={tabIndex} index={0}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      ml: 'auto',
                      mb: '12px',
                    }}
                  >
                    <Button
                      variant={isLongerRatio ? 'outlined' : 'contained'}
                      sx={{
                        borderRadius: '8px',
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      onClick={() => setIsLongerRatio(false)}
                    >
                      4:3
                    </Button>
                    <Button
                      variant={isLongerRatio ? 'contained' : 'outlined'}
                      sx={{
                        borderRadius: '8px',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      onClick={() => setIsLongerRatio(true)}
                    >
                      16:9
                    </Button>
                  </Box>
                  <Grid container>
                    {bannerList.map((banner, index) => (
                      <Grid item key={index} xs={12} sm={6} lg={4} padding="8px">
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px',
                            backgroundColor: '#D0030020',
                            borderRadius: '8px',
                            boxShadow: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              borderRadius: '8px',
                              backgroundImage: `url(${banner.path.includes('\\') ? banner.path.replaceAll('\\', '/') : banner.path})`,
                              aspectRatio: isLongerRatio ? 16 / 9 : 4 / 3,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                              boxShadow: 3,
                            }}
                          ></Box>
                          <Grid container spacing="8px" sx={{ mt: '8px' }}>
                            <Grid item xs={4}>
                              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  disabled={index === 0}
                                  sx={{
                                    borderRadius: '8px',
                                  }}
                                  onClick={() => UpdateBanner(banner.id, 'up')}
                                >
                                  <ArrowBackIcon sx={{ color: index === 0 ? '#452424' : '#8E0000' }} />
                                </Button>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'cneter' }}>
                                <Button color="primary" variant="contained" sx={{ borderRadius: '8px', mx: 'auto' }} onClick={() => DeleteBanner(banner.id)}>
                                  <DeleteOutlineIcon sx={{ color: '#fff' }} />
                                </Button>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  disabled={index === bannerList.length - 1}
                                  sx={{
                                    borderRadius: '8px',
                                    mr: 'auto',
                                  }}
                                  onClick={() => UpdateBanner(banner.id, 'down')}
                                >
                                  <ArrowForwardIcon sx={{ color: index === bannerList.length - 1 ? '#452424' : '#8E0000' }} />
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    ))}
                    <Grid item xs={12} sm={6} lg={4} padding="8px">
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '8px',
                          backgroundColor: '#D0030020',
                          borderRadius: '8px',
                          // boxShadow: 1,
                        }}
                      >
                        <input type="file" accept="image/*" multiple onChange={handleAddFiles} style={{ display: 'none' }} id="upload-image" />
                        <label htmlFor="upload-image">
                          <Button
                            color="primary"
                            variant="contained"
                            sx={{
                              borderRadius: '8px',
                            }}
                            startIcon={<AddCircleOutlineIcon />}
                            component="span"
                          >
                            Thêm ảnh
                          </Button>
                        </label>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </CustomTabPanel>
              <CustomTabPanel value={tabIndex} index={1}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      ml: 'auto',
                      mb: '12px',
                    }}
                  >
                    <Button
                      variant={isLongerRatio ? 'outlined' : 'contained'}
                      sx={{
                        borderRadius: '8px',
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      onClick={() => setIsLongerRatio(false)}
                    >
                      3:4
                    </Button>
                    <Button
                      variant={isLongerRatio ? 'contained' : 'outlined'}
                      sx={{
                        borderRadius: '8px',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}
                      onClick={() => setIsLongerRatio(true)}
                    >
                      9:16
                    </Button>
                  </Box>
                  <Grid container>
                    {bannerList.map((banner, index) => (
                      <Grid item key={index} xs={12} sm={6} md={4} lg={3} padding="8px">
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px',
                            backgroundColor: '#D0030020',
                            borderRadius: '8px',

                            '& img': {
                              width: '100%',
                              borderRadius: '8px',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              borderRadius: '8px',
                              backgroundImage: `url(${banner.path.includes('\\') ? banner.path.replaceAll('\\', '/') : banner.path})`,
                              aspectRatio: isLongerRatio ? 9 / 16 : 3 / 4,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              backgroundSize: 'cover',
                            }}
                          ></Box>
                          <Grid container spacing="8px" sx={{ mt: '8px' }}>
                            <Grid item xs={4}>
                              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  disabled={index === 0}
                                  sx={{
                                    borderRadius: '8px',
                                  }}
                                  onClick={() => UpdateBanner(banner.id, 'up')}
                                >
                                  <ArrowBackIcon sx={{ color: index === 0 ? '#452424' : '#8E0000' }} />
                                </Button>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'cneter' }}>
                                <Button
                                  color="primary"
                                  variant="contained"
                                  sx={{
                                    borderRadius: '8px',
                                    mx: 'auto',
                                  }}
                                  onClick={() => DeleteBanner(banner.id)}
                                >
                                  <DeleteOutlineIcon sx={{ color: '#fff' }} />
                                </Button>
                              </Box>
                            </Grid>
                            <Grid item xs={4}>
                              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  disabled={index === bannerList.length - 1}
                                  sx={{
                                    borderRadius: '8px',
                                    mr: 'auto',
                                  }}
                                  onClick={() => UpdateBanner(banner.id, 'down')}
                                >
                                  <ArrowForwardIcon sx={{ color: index === bannerList.length - 1 ? '#452424' : '#8E0000' }} />
                                </Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    ))}
                    <Grid item xs={12} sm={6} md={4} lg={3} padding="8px">
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '8px',
                          backgroundColor: '#D0030020',
                          borderRadius: '8px',
                          // boxShadow: 1,
                        }}
                      >
                        <input type="file" accept="image/*" multiple onChange={handleAddFiles} style={{ display: 'none' }} id="upload-image" />
                        <label htmlFor="upload-image">
                          <Button
                            color="primary"
                            variant="contained"
                            sx={{
                              borderRadius: '8px',
                            }}
                            startIcon={<AddCircleOutlineIcon />}
                            component="span"
                          >
                            Thêm ảnh
                          </Button>
                        </label>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </CustomTabPanel>
            </Box>
          </Box>
        </>
      </main>
    </>
  )
}
