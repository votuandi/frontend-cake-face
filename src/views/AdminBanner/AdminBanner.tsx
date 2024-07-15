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
import { useDispatch, useSelector } from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { RootState } from '@/store/rootReducer'
import { getBanners } from '@/store/banner/banner.action'
import { bannerApi } from '@/utils/api'

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
  const { banners } = useSelector((state: RootState) => state.banner)

  const [isLongerRatio, setIsLongerRatio] = useState<boolean>(false)
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false)

  let GetBannerList = async () => {
    try {
      dispatch(getBanners())
    } catch (error) {
      console.log(error)
    }
  }

  let DeleteBanner = async (id: string) => {
    try {
      setIsShowLoading(true)
      let res = await bannerApi.deleteBanner(id)
      if (res.data.status) {
        GetBannerList()
      } else {
        alert('Xóa ảnh thất bại. Vui lòng thử lại!')
        setIsShowLoading(false)
      }
    } catch (error) {
      setIsShowLoading(false)
      console.log(error)
    }
  }

  let UpdateBanner = async (id: string, action: 'up' | 'down') => {
    try {
      setIsShowLoading(true)
      let res = await bannerApi.update(id, action)
      if (res.status === 200) {
        GetBannerList()
        setIsShowLoading(false)
      }
    } catch (error) {
      setIsShowLoading(false)
      console.log(error)
    }
  }

  let AddNewBanner = async (image: File) => {
    try {
      let res = await bannerApi.addBanner(image)
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
      setIsShowLoading(true)
      const selectedFiles = e.target.files
      let amountSuccess = 0
      for (let i = 0; i < selectedFiles.length; i++) {
        let file: File = selectedFiles[i]
        let res = await AddNewBanner(file)
        if (res) amountSuccess += 1
        else amountSuccess -= 1
      }
      setIsShowLoading(false)
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
              fontFamily: 'Open Sans',
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
              Chỉnh sửa Banner
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
              }}
            >
              <Grid container>
                {banners.map((banner, index) => (
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
                        backgroundColor: '#26787c20',
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
                              onClick={() => UpdateBanner(banner.id.toString(), 'up')}
                            >
                              <ArrowBackIcon sx={{ color: index === 0 ? '#26787c' : '#4ac2c7' }} />
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'cneter' }}>
                            <Button color="primary" variant="contained" sx={{ borderRadius: '8px', mx: 'auto' }} onClick={() => DeleteBanner(banner.id.toString())}>
                              <DeleteOutlineIcon sx={{ color: '#fff' }} />
                            </Button>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                            <Button
                              color="secondary"
                              variant="contained"
                              disabled={index === banners.length - 1}
                              sx={{
                                borderRadius: '8px',
                                mr: 'auto',
                              }}
                              onClick={() => UpdateBanner(banner.id.toString(), 'down')}
                            >
                              <ArrowForwardIcon sx={{ color: index === banners.length - 1 ? '#26787c' : '#4ac2c7' }} />
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
                      backgroundColor: '#26787c20',
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
          </Box>
        </>
      </main>
    </>
  )
}
