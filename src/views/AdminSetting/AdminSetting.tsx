/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useIsMounted, useOnClickOutside } from 'usehooks-ts'
import useStyles from './AdminSetting.style'
import { Box, Button, CircularProgress, Container, Grid, MenuItem, Pagination, Select, TextField, Typography, useMediaQuery } from '@mui/material'
import Head from 'next/head'
import theme from '@/assets/theme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'

import { getSettings } from '@/store/setting/setting.action'
import settingApi, { LOGO_TYPE } from '@/utils/api/setting'
import AppCropper from '@/components/AppCropper'

export default function AdminSetting() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600))
  const isSmallScreenMenu = useMediaQuery(theme.breakpoints.down(900))
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const { settings } = useSelector((state: RootState) => state.setting)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentLogo, setCurrentLogo] = useState<{ small: string; full: string }>({ small: '', full: '' })
  const [seoContent, setSeoContent] = useState<string>(settings.findLast((x) => x.name === 'seo_content')?.value ?? '')
  const [isShowCropper, setIsShowCropper] = useState<boolean>(false)
  const [inputCropper, setInputCropper] = useState<{ inputImage: File | null; type: LOGO_TYPE } | null>(null)
  const [icon, setIcon] = useState<string>('')

  const handleSmallLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setInputCropper({
          inputImage: e.target.files[0],
          type: LOGO_TYPE.SMALL,
        })
        setIsShowCropper(true)
        // let res = await settingApi.updateLogo({
        //   params: {
        //     name: LOGO_TYPE.SMALL,
        //     image: e.target.files[0],
        //   },
        // })
        // if (res.status) {
        //   alert('Update logo successfully!')
        //   await fetchSettings()
        // } else {
        //   alert('Update logo failed!')
        // }
      } catch (error) {
        console.log(error)
        alert('Update logo failed!')
      }
    }
  }

  const handleFullLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        setInputCropper({
          inputImage: e.target.files[0],
          type: LOGO_TYPE.FULL,
        })
        setIsShowCropper(true)
        // let res = await settingApi.updateLogo({
        //   params: {
        //     name: LOGO_TYPE.FULL,
        //     image: e.target.files[0],
        //   },
        // })
        // if (res.status) {
        //   alert('Update logo successfully!')
        //   await fetchSettings()
        // } else {
        //   alert('Update logo failed!')
        // }
      } catch (error) {
        console.log(error)
        alert('Update logo failed!')
      }
    }
  }

  const handleCropImage = async (croppedImage: File) => {
    try {
      if (!inputCropper?.type) return
      let res = await settingApi.updateLogo({
        params: {
          name: inputCropper?.type,
          image: croppedImage,
        },
      })
      if (res.status) {
        alert('Update logo successfully!')
        setIsShowCropper(false)
        setInputCropper(null)
        await fetchSettings()
      } else {
        alert('Update logo failed!')
      }
    } catch (error) {
      console.log(error)
      alert('Update logo failed!')
    }
  }

  const handleCancelCrop = () => {
    setInputCropper(null)
    setIsShowCropper(false)
  }

  const handleSaveSeoContent = async () => {
    try {
      let res = await settingApi.updateSeoContent({
        params: {
          value: seoContent,
        },
      })
      if (res.status) {
        alert('Update Seo content successfully!')
        await fetchSettings()
      } else {
        alert('Update Seo content failed!')
      }
    } catch (error) {
      console.log(error)
      alert('Update Seo content failed!')
    }
  }

  let fetchSettings = async () => {
    dispatch(getSettings())
  }

  let FetchData = async () => {
    await fetchSettings()
  }

  useEffect(() => {
    let smLogo = settings.findLast((x) => x.name === `${LOGO_TYPE.SMALL}_logo`)
    let flLogo = settings.findLast((x) => x.name === `${LOGO_TYPE.FULL}_logo`)
    let _icon = settings.findLast((x) => x.name === `ico_logo`)
    let seo = settings.findLast((x) => x.name === `seo_content`)

    setCurrentLogo({
      small: smLogo ? smLogo.value : '',
      full: flLogo ? flLogo.value : '',
    })
    setIcon(_icon?.value ? _icon.value : '')
    setSeoContent(seo?.value ? seo.value : '')
  }, [settings])

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
                Thiết lập web
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
                padding: '20px',
              }}
            >
              <Grid container sx={{ fontFamily: 'Open Sans' }}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#26787c',
                      mb: '12px',
                    }}
                  >
                    Logo:
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    borderRadius: '8px',
                    '&:hover': { backgroundColor: '#26787c26' },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '200px',
                      backgroundImage: `url(${currentLogo.small ? encodeURI(currentLogo.small) : ' '})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      margin: '0 auto',
                      mb: '12px',
                    }}
                  ></Box>
                  <input type="file" accept="image/*" onChange={handleSmallLogoChange} style={{ display: 'none' }} id="upload-image" />
                  <label htmlFor="upload-image" style={{ margin: '0 auto' }}>
                    <Button variant="contained" component="span">
                      Chọn Logo Nhỏ
                    </Button>
                  </label>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    borderRadius: '8px',
                    '&:hover': { backgroundColor: '#26787c26' },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '200px',
                      backgroundImage: `url(${currentLogo.full ? encodeURI(currentLogo.full) : ''})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      margin: '0 auto',
                      mb: '12px',
                    }}
                  ></Box>
                  <input type="file" accept="image/*" onChange={handleFullLogoChange} style={{ display: 'none' }} id="upload-image-full" />
                  <label htmlFor="upload-image-full" style={{ margin: '0 auto' }}>
                    <Button variant="contained" component="span">
                      Chọn Logo Đầy đủ
                    </Button>
                  </label>
                </Grid>{' '}
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: '#26787c',
                      mt: '32px',
                      mb: '12px',
                    }}
                  >
                    Seo Content:
                  </Typography>
                  <TextField fullWidth multiline maxRows={20} minRows={5} value={seoContent} onChange={(e) => setSeoContent(e.target.value)}></TextField>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: '8px', mt: '12px', padding: '8px 4px' }}
                    disabled={(!settings.findLast((x) => x.name === 'seo_content') && !seoContent) || settings.findLast((x) => x.name === 'seo_content')?.value === seoContent}
                    onClick={handleSaveSeoContent}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
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
          {isShowCropper && !!inputCropper?.inputImage && (
            <AppCropper inputImage={inputCropper.inputImage} type={inputCropper.type} onCancel={handleCancelCrop} onDone={handleCropImage} />
          )}
        </Box>
      </main>
    </>
  )
}
