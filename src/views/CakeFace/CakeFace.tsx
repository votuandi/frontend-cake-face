/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import useStyles from './CakeFace.style'
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getCategoryList } from '@/store/category/category.action'
import { getCakeFaceDetail, getCakeFaceList } from '@/store/cakeFace/cakeFace.action'
import theme from '@/assets/theme'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DownloadIcon from '@mui/icons-material/Download'
import { getOptionList } from '@/store/option/option.action'
import { formatDate } from '@/utils/helpers/common'
import Slider from 'react-slick'
import parse from 'html-react-parser'
import { getCookie } from '@/utils/helpers/cookie'
import { COOKIE_USER_ROLE } from '@/utils/constants/cookie.constant'
import SearchIcon from '@mui/icons-material/Search'
import ForumIcon from '@mui/icons-material/Forum'
import { getCurrentUserInfo } from '@/store/user/user.action'
import { blue } from '@mui/material/colors'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import Link from 'next/link'
import { getSettings } from '@/store/setting/setting.action'
import Head from 'next/head'

type IMAGE_LIST_TYPE = {
  id: string
  thumbnail: string
}

export default function CakeFace() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const dispatch = useDispatch()
  const isMobile = useMediaQuery(theme.breakpoints.down(900))
  const router = useRouter()
  const sliderRef = useRef<Slider>(null)

  const userRole = getCookie(COOKIE_USER_ROLE)
  const { settings } = useSelector((state: RootState) => state.setting)

  const [icon, setIcon] = useState<string>('')
  const [logo, setLogo] = useState<string>('')
  const [seoContent, setSeoContent] = useState<string>('')
  const { cakeFaceList, cakeFaceDetail, cakeFaceDetailLoading } = useSelector((state: RootState) => state.cakeFace)
  const { optionList, optionListLoading } = useSelector((state: RootState) => state.option)
  const { currentUserInfo } = useSelector((state: RootState) => state.user)

  const [cakeFaceId, setCakeFaceId] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [imageList, setImageList] = useState<Array<IMAGE_LIST_TYPE>>([])
  const [currentSliderIndex, setCurrentSliderIndex] = useState<number>(0)
  const [isShowDownload, setShowDownload] = useState<boolean>(false)

  const SLIDER_SETTING = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current: number, next: number) => setCurrentSliderIndex(next),
  }

  let FetchData = async (id?: string) => {
    dispatch(getCakeFaceDetail(id ? id : cakeFaceId))
    dispatch(getOptionList({ params: { isActive: '1', cakeFaceId: id } }))
    dispatch(getCakeFaceList({ params: { isActive: '1', limit: 8 } }))
    dispatch(getCurrentUserInfo())
    dispatch(getSettings())
  }

  const handleClickDownload = () => {
    if (currentUserInfo?.role && ['admin', 'client'].includes(currentUserInfo?.role)) {
      setShowDownload(true)
    } else alert('Chỉ khách hàng đã mua máy của Abaso mới tải được file.')
  }

  useEffect(() => {
    if (isMounted()) return
    let { slug } = router.query
    let id: string = ''
    if (typeof slug === 'string') {
      id = slug
    }
    setCakeFaceId(id)
    FetchData(id)
  }, [])

  useEffect(() => {
    let _option = router.query['option']

    if (!!_option) {
      setSelectedOption(String(_option))
    } else {
      setSelectedOption('')
    }
  }, [router.query])

  useEffect(() => {
    if (!!cakeFaceDetail) {
      let imgList: IMAGE_LIST_TYPE[] = optionList.map((x) => {
        return {
          id: x.id,
          thumbnail: x.image,
        }
      })
      setImageList([{ id: '', thumbnail: cakeFaceDetail.thumbnail }, ...imgList])
    }
  }, [cakeFaceDetail, optionList])

  useEffect(() => {
    console.log(imageList, optionList)
  }, [imageList])

  useEffect(() => {
    let index = imageList.findIndex((x) => x.id === selectedOption)
    sliderRef.current?.slickGoTo(index)
  }, [selectedOption])

  useEffect(() => {
    settings.forEach((x) => {
      if (x.name === 'seo_content') setSeoContent(x.value)
      if (x.name === 'ico_logo') setIcon(x.value)
      if (x.name === 'full_logo') setLogo(x.value)
    })
  }, [settings])

  const { classes } = useStyles({ params: {} })
  let isMounted = useIsMounted()

  return !cakeFaceDetailLoading && !optionListLoading ? (
    <>
      <Head>
        <title>{`${cakeFaceDetail?.name ? cakeFaceDetail?.name : 'Mẫu bánh'} - Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com`}</title>
        <link rel="icon" href={icon} />
        <meta name="description" content={cakeFaceDetail?.detail ? cakeFaceDetail?.detail : 'Mẫu bánh - Tìm bánh - timbanh.com'} />
        <meta property="og:title" content={`${cakeFaceDetail?.name ? cakeFaceDetail?.name : 'Mẫu bánh'} - Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com`} />
        <meta property="og:description" content={seoContent} />
        <meta property="og:image" content={logo} />
      </Head>
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', pt: isMobile ? 0 : '50px' }}>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
            margin: '0px 0 140px 0',
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                aspectRatio: 1,
              }}
            >
              <Box sx={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {imageList.length > 1 ? (
                  <Slider ref={sliderRef} {...SLIDER_SETTING} className={classes.slider}>
                    {imageList.map((item, index) => (
                      <Box sx={{ width: '100%', backgroundColor: '#B3E7D080' }} key={index}>
                        <Box
                          sx={{
                            width: '100%',
                            // height: '450px',
                            aspectRatio: 1,
                            backgroundImage: `url(${item?.thumbnail.replaceAll(/\\/g, '/')})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                          }}
                        ></Box>
                      </Box>
                    ))}
                  </Slider>
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      // height: '450px',
                      aspectRatio: 1,
                      backgroundImage: `url(${cakeFaceDetail?.thumbnail.replaceAll(/\\/g, '/')})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></Box>
                )}
                <Box sx={{ overflow: 'auto' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px', width: 'fit-content' }}>
                    {optionList.map((opt) => (
                      <Box
                        key={opt.id}
                        sx={{
                          width: '120px',
                          height: '120px',
                          backgroundImage: `url('${opt?.image.replaceAll(/\\/g, '/')}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                        }}
                        onClick={() => setSelectedOption((x) => (x === opt.id ? '' : opt.id))}
                      ></Box>
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    borderRadius: '8px',
                    padding: '4px 8px',
                    backgroundColor: '#1a1a1a60',
                    color: '#fff',
                    fontSize: '14px',
                    position: 'absolute',
                    width: 'fit-content',
                    bottom: '132px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontFamily: 'Open Sans',
                  }}
                >{`${currentSliderIndex + 1}/${imageList.length}`}</Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: isMobile ? '20px 0' : '40px 20px 20px 40px',
                fontFamily: 'Open Sans',
              }}
            >
              <Typography sx={{ fontSize: '32px', fontWeight: 900, color: '#26787ccc' }}>{cakeFaceDetail?.name}</Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#767676' }}>{`Ngày tạo: ${
                cakeFaceDetail?.createDate ? formatDate(new Date(cakeFaceDetail?.createDate)) : 'Không xác định'
              }`}</Typography>
              <Typography className="text-4-line" sx={{ fontSize: '16px', fontWeight: 400, color: '#1a1a1acc', marginTop: '16px' }}>
                {cakeFaceDetail?.detail}
              </Typography>
              {/* <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
              {optionList.map((opt) => (
                <Box
                  key={opt.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    borderRadius: '16px',
                    height: '32px',
                    border: '1px solid #767676ee',
                    boxShadow: 2,
                    cursor: 'pointer',
                    backgroundColor: selectedOption === opt.id ? '#87e0c6' : '#fff',
                  }}
                  onClick={() => setSelectedOption((x) => (x === opt.id ? '' : opt.id))}
                >
                  <Box
                    sx={{
                      height: '32px',
                      aspectRatio: 1,
                      borderRadius: '16px',
                      backgroundImage: `url('${opt?.image.replaceAll(/\\/g, '/')}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></Box>
                  <Box
                    sx={{
                      height: '32px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0 8px',
                      color: '#000000cc',
                      fontSize: '16px',
                    }}
                  >
                    {opt?.name}
                  </Box>
                </Box>
              ))}
            </Box> */}
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: '20px',
              fontFamily: 'Open Sans',
              lineHeight: 1.5,
              listStylePosition: 'inside',
              '& img': { maxWidth: '100%' },
            }}
          >
            {/* <Typography sx={{ color: '#000000cc', fontWeight: 500, fontSize: '28px' }}>Chi tiết</Typography> */}
            {parse(cakeFaceDetail?.content ? cakeFaceDetail?.content : '')}
          </Box>
        </Container>

        <Box
          sx={{
            width: '100vw',
            height: '80px',
            position: 'fixed',
            left: 0,
            bottom: 0,
            backgroundColor: '#a9d9bb',
            boxShadow: '1px -3px 10px -4px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '8px',
            alignItems: 'start',
            fontFamily: 'Open Sans',
            textAlign: 'center',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        >
          <Box
            // onClick={() => router.push('/')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer',
              height: '100%',
              borderRadius: '8px',

              '&:hover': {
                backgroundColor: '#629b5c30',
              },
            }}
          >
            <SearchIcon sx={{ fontSize: '36px', color: '#fff' }} />
            <Typography className="text-2-line" sx={{ color: '#fff', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
              Tìm tiệm bánh
            </Typography>
          </Box>
          <Box
            // onClick={() => router.push('/account')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer',
              height: '100%',
              borderRadius: '8px',

              '&:hover': {
                backgroundColor: '#629b5c30',
              },
            }}
          >
            <ForumIcon sx={{ fontSize: '36px', color: '#fff' }} />
            <Typography className="text-2-line" sx={{ color: '#fff', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
              Hỗ trợ
            </Typography>
          </Box>
          <Box
            onClick={handleClickDownload}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              flex: 1,
              cursor: 'pointer',
              height: '100%',
              borderRadius: '8px',

              '&:hover': {
                backgroundColor: '#629b5c30',
              },
            }}
          >
            <DownloadIcon sx={{ fontSize: '36px', color: '#fff' }} />
            <Typography className="text-2-line" sx={{ color: '#fff', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
              Download File
            </Typography>
          </Box>
        </Box>
        <Dialog open={isShowDownload} sx={{ fontFamily: 'Open Sans' }}>
          <DialogTitle>Choose Download Files</DialogTitle>
          {cakeFaceDetail?.configFilePath && cakeFaceDetail?.configFilePath.length > 0 ? (
            <List sx={{ px: '10px' }}>
              {cakeFaceDetail?.configFilePath.split(',').map((item, index) => (
                <Link href={item} target="_blank" key={index}>
                  <ListItem disableGutters sx={{ textDecoration: 'none' }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <FileDownloadIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText className="text-2-line" primary={`File ${index + 1}`} />
                  </ListItem>
                </Link>
              ))}
            </List>
          ) : (
            <Typography sx={{ textAlign: 'center', p: '10px' }}>Chưa cập nhật files</Typography>
          )}
          <DialogActions>
            <Button onClick={() => setShowDownload(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  ) : (
    <>
      <Head>
        <title>{`${cakeFaceDetail?.name ? cakeFaceDetail?.name : 'Mẫu bánh'} - Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com`}</title>
        <link rel="icon" href={icon} />
        <meta name="description" content={seoContent} />
        <meta property="og:title" content={`${cakeFaceDetail?.name ? cakeFaceDetail?.name : 'Mẫu bánh'} - Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com`} />
        <meta property="og:description" content={seoContent} />
        <meta property="og:image" content={logo} />
      </Head>
    </>
  )
}
