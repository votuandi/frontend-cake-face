/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted } from 'usehooks-ts'
import useStyles from './Home.style'
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Pagination, Select, Typography, useMediaQuery } from '@mui/material'
import AppBanner from '@/components/AppBanner'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { getCategoryList } from '@/store/category/category.action'
import { getCakeFaceList, getTrendyCakeFaceList } from '@/store/cakeFace/cakeFace.action'
import { CAKE_FACE_SORT_LIST, SORT_BY_TYPE } from '@/utils/constants/common.constant'
import theme from '@/assets/theme'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DownloadIcon from '@mui/icons-material/Download'
import Slider from 'react-slick'
import { getBanners } from '@/store/banner/banner.action'
import { getSettings } from '@/store/setting/setting.action'
import Head from 'next/head'

const TAB_TITLES = ['News', 'Promotion']

export default function Home() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const dispatch = useDispatch()
  const isMobile = useMediaQuery(theme.breakpoints.down(600))
  const router = useRouter()

  const SLIDER_SETTING = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 2.5,
    slidesToScroll: 0.5,
  }

  const { categoryList } = useSelector((state: RootState) => state.category)
  const { cakeFaceList, cakeFaceListError, cakeFaceListLoading, cakeFaceTotalPage, cakeFaceTotalPageActive, trendyCakeFaceList } = useSelector((state: RootState) => state.cakeFace)
  const { settings } = useSelector((state: RootState) => state.setting)

  const [icon, setIcon] = useState<string>('')
  const [logo, setLogo] = useState<string>('')
  const [seoContent, setSeoContent] = useState<string>('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [sortBy, setSortBy] = useState<SORT_BY_TYPE>('name')
  const [selectedName, setSelectedName] = useState<string>()

  const [limit, setLimit] = useState<number>(20)
  const [page, setPage] = useState<number>(1)

  let FetchData = async () => {
    dispatch(getCategoryList({ params: { isActive: '1' } }))
    dispatch(getTrendyCakeFaceList({ params: { isActive: '1', isTrendy: '1' } }))
    dispatch(getCakeFaceList({ params: { isActive: '1' } }))
    dispatch(getSettings())
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
    dispatch(
      getCakeFaceList({
        params: {
          categoryId: selectedCategoryId,
          sortBy,
          name: selectedName ? selectedName : '',
          limit,
          page,
        },
      })
    )
  }, [selectedCategoryId, sortBy, selectedName, page])

  useEffect(() => {
    setPage(1)
    let _name = router.query['name']

    if (!!_name) {
      setSelectedName(String(_name))
    } else {
      setSelectedName('')
    }

    console.log(router.query)
  }, [router.query])

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
        <title>Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com</title>
        <link rel="icon" href={icon} />
        <meta name="description" content={seoContent} />
        <meta property="og:title" content="Tìm Bánh - Thiên Đường Bánh Thiết Kế Theo Ý Bạn -Timbanh.com" />
        <meta property="og:description" content={seoContent} />
        <meta property="og:image" content={logo} />
      </Head>
      <Box
        sx={{
          width: '100%',
          // height: '100vh',
          position: 'relative',
          paddingBottom: '80px',
        }}
      >
        <AppBanner />
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
            // marginTop: '10px',
          }}
        >
          <Box sx={{ width: '100%', '& .slick-slide': { margin: '0px 2px' } }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 800, color: '#0596A6', fontFamily: 'Open Sans', padding: '12px 0 8px 0' }}>Mẫu bánh Hot Trend</Typography>
            <Slider {...SLIDER_SETTING}>
              {trendyCakeFaceList.map((item, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      width: '100%',
                      aspectRatio: 1,
                      backgroundImage: `url("${item?.thumbnail ? encodeURI(item?.thumbnail.replaceAll(/\\/g, '/')) : ''}")`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      position: 'relative',
                      borderRadius: '4px',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        padding: '4px',
                        borderRadius: '4px',
                        background: 'linear-gradient(180deg, rgba(207,255,203,0) 0%, rgba(34,93,97,0.65) 50%, rgba(34,93,97,1) 100%)',
                      }}
                    >
                      <Typography
                        className="text-1-line"
                        sx={{
                          fontSize: '16px',
                          fontWeight: 600,
                          fontFamily: 'Open Sans',
                          color: '#fff',
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                  </Box>
                )
              })}
            </Slider>
          </Box>
          {/* <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'start',
          alignItems: 'center',
          gap: '12px',
          marginTop: '16px',
        }}
      >
        {categoryList.map((category) => (
          <Box
            key={category.id}
            sx={{
              // border: category.id === selectedCategoryId ? '1px solid #34bc9800' : '1px solid #3a3a3a',
              borderRadius: '8px',
              padding: category.id === selectedCategoryId ? '4px 8px' : '3px 8px',
              color: category.id === selectedCategoryId ? '#fefcd3' : '#3a3a3a',
              background:
                category.id === selectedCategoryId
                  ? 'linear-gradient(180deg, rgba(181,231,208,1) 0%, rgba(135,224,198,1) 5%, rgba(91,214,178,1) 40%, rgba(91,214,178,1) 60%, rgba(135,224,198,1) 95%, rgba(181,231,208,1) 100%)'
                  : '#eeeeed',
              boxShadow: category.id === selectedCategoryId ? 2 : 1,
              fontSize: '14px',
              fontWeight: category.id === selectedCategoryId ? 600 : 500,
              fontFamily: 'Open Sans',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedCategoryId((x) => (x === category.id ? '' : category.id))}
          >
            {category?.name}
          </Box>
        ))}
      </Box> */}
          <Box
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Open Sans', width: '100%', margin: '16px 0 10px 0' }}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: 800, color: '#0596A6' }}>Đa dạng chủ đề bánh</Typography>
            <FormControl>
              <InputLabel
                sx={{
                  fontSize: '14px',
                  color: '#0596A6',
                  backgroundColor: '#fff',
                }}
                id="category-label"
              >
                Sắp xếp theo
              </InputLabel>
              <Select
                sx={{
                  backgroundColor: '#fff',
                  width: '120px',
                  '& .MuiFormHelperText-root': {
                    backgroundColor: 'transparent',
                    color: 'red',
                  },
                  '& .MuiSelect-outlined': {
                    padding: '3px 16px',
                  },
                }}
                defaultValue={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
              >
                {CAKE_FACE_SORT_LIST.map((sortByItem) => (
                  <MenuItem
                    sx={{
                      fontFamily: 'Open Sans',
                    }}
                    key={sortByItem.value}
                    value={sortByItem.value}
                  >
                    {sortByItem.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              height: '160px',
              flexDirection: 'column',
              flexWrap: 'wrap',
              overflow: 'auto',
            }}
          >
            {categoryList.map((item, index) => (
              <Box
                key={index}
                onClick={() => setSelectedCategoryId((x) => (x === item.id ? '' : item.id))}
                sx={{
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '4px',
                  gap: '4px',
                  alignItems: 'center',
                  fontFamily: 'Open Sans',
                  backgroundColor: selectedCategoryId === item.id ? 'rgba(181,231,208,.6)' : '#fff',
                  borderRadius: '4px',
                  cursor: 'pointer',

                  '&:hover': {
                    backgroundColor: 'rgba(181, 231, 208, 0.2)',
                  },

                  '& img': {
                    width: '36px',
                    height: '36px',
                  },
                }}
              >
                <img src={item?.thumbnail} alt="" />
                <Typography
                  className="text-2-line"
                  sx={{ fontSize: '12px', lineHeight: 1.5, textAlign: 'center', fontWeight: selectedCategoryId === item.id ? 700 : 500, color: '#26787c' }}
                >
                  {item?.name}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'end',
              alignItems: 'center',
              fontFamily: 'Open Sans',
            }}
          ></Box>

          <Grid container spacing="12px" sx={{ margin: '40px 0 40px -12px' }}>
            {cakeFaceList.map((item) => (
              <Grid
                item
                mobile={6}
                sm={4}
                md={3}
                key={item?.id}
                sx={{
                  gap: 2,
                }}
              >
                <Box
                  onClick={() => router.push(`/cake-face/${item?.id}`)}
                  sx={{
                    width: '100%',
                    aspectRatio: isMobile ? 2 / 3 : 0.75,
                    border: '1px solid #ceced080',
                    borderRadius: '8px',
                    cursor: 'pointer',

                    '&:hover': {
                      boxShadow: 2,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: 1.25,
                      backgroundImage: `url("${item?.thumbnail ? encodeURI(item?.thumbnail.replaceAll(/\\/g, '/')) : ''}")`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                  ></Box>
                  <Box
                    sx={{
                      padding: '4px 6px',
                      fontFamily: 'Open Sans',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        padding: '4px 6px',
                        fontFamily: 'Open Sans',
                        gap: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography
                        className="text-2-line"
                        sx={{
                          color: '#249580',
                          fontWeight: 700,
                          fontSize: isMobile ? '18px' : '22px',
                          height: isMobile ? '48px' : '60px',
                        }}
                      >
                        {item?.name}
                      </Typography>
                      <Typography
                        className="text-2-line"
                        sx={{
                          color: '#1a1a1a',
                          fontWeight: 400,
                          fontSize: isMobile ? '12px' : '14px',
                          height: isMobile ? '34px' : '38px',
                        }}
                      >
                        {item?.detail}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '6px',
                        mt: '4px',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: 'fit-content',
                          gap: '4px',
                        }}
                      >
                        <VisibilityOutlinedIcon sx={{ color: '#EDC458', height: '20px' }} />
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#EDC458' }}>{item?.viewAmount}</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'start',
                          alignItems: 'center',
                          width: 'fit-content',
                          gap: '4px',
                        }}
                      >
                        <DownloadIcon sx={{ color: '#EDC458', height: '20px' }} />
                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: '16px', fontWeight: 400, color: '#EDC458' }}>{item?.downloadAmount}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          {cakeFaceTotalPage > 1 && <Pagination sx={{ marginLeft: 'auto' }} onChange={(e, v) => setPage(v)} count={cakeFaceTotalPage} size="small" />}
        </Container>
      </Box>
    </>
  )
}
