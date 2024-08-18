/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useIsMounted, useOnClickOutside } from 'usehooks-ts'
import useStyles from './AdminUser.style'
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
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Head from 'next/head'
import { formatDate, gotoPage } from '@/utils/helpers/common'
import theme from '@/assets/theme'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/rootReducer'
import { GET_USER_LIST_PAYLOAD } from '@/utils/api/user'
import { getUserList } from '@/store/user/user.action'
import CreateAccount from './components/CreateAccount'
import { getSettings } from '@/store/setting/setting.action'

export default function AdminUser() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(600))
  const isSmallScreenMenu = useMediaQuery(theme.breakpoints.down(900))
  const menuRef = useRef(null)
  const dispatch = useDispatch()
  const { userList, userListLoading, userListError, userTotalPage } = useSelector((state: RootState) => state.user)
  const { settings } = useSelector((state: RootState) => state.setting)

  const [icon, setIcon] = useState<string>('')
  const [logo, setLogo] = useState<string>('')
  const [seoContent, setSeoContent] = useState<string>('')
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedRole, setSelectedRole] = useState<'admin' | 'client' | 'user' | '_'>('_')
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [keyword, setKeyword] = useState<string>('')
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  let handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  let fetchUsers = async () => {
    let payload: GET_USER_LIST_PAYLOAD = {
      params: {
        limit,
        page,
        keyword,
      },
    }
    if (selectedRole !== '_') {
      payload.params.role = selectedRole
    }
    dispatch(
      getUserList({
        params: payload.params,
      })
    )
  }

  let FetchData = async () => {
    await fetchUsers()
    dispatch(getSettings())
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
    fetchUsers()
  }, [selectedRole, keyword])

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
        <title>Admin - Tìm bánh</title>
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
              Quản lý Tài khoản
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="basic tabs example">
                  <Tab label="Danh sách" />
                  <Tab label="Tạo tài khoản" />
                  <Tab label="Quên mật khẩu" />
                </Tabs>
              </Box>
            </Box>
            {tabIndex === 0 ? (
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
                    marginTop: '8px',
                  }}
                >
                  <TextField
                    sx={{ width: '300px', backgroundColor: '#fff', borderRadius: '4px', '& fieldset': { borderRadius: '4px' }, '& input': { padding: '4px 10px' } }}
                    placeholder="Nhận để tìm kiếm"
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <Select
                    sx={{
                      backgroundColor: '#fff',
                      width: '160px',
                      '& .MuiFormHelperText-root': {
                        backgroundColor: 'transparent',
                        color: 'red',
                      },
                      '& .MuiSelect-select': { padding: '4px 10px' },
                    }}
                    defaultValue="_"
                    onChange={(e: any) => setSelectedRole(e.target.value as '_' | 'admin' | 'client' | 'user')}
                  >
                    {[
                      { id: '_', name: 'Tất cả' },
                      { id: 'admin', name: 'Admin' },
                      { id: 'client', name: 'Client' },
                      { id: 'user', name: 'User' },
                    ].map((filter) => (
                      <MenuItem key={filter.id} value={filter.id} sx={{ fontFamily: 'Open Sans' }}>
                        {filter.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  {userList.map((user, index) => (
                    <Grid
                      container
                      key={index}
                      sx={{
                        borderRadius: '4px',
                        padding: '4px',
                        borderBottom: '1px solid #1a1a1a20',
                        '&:hover': { backgroundColor: '#26787c20' },
                        '& .MuiGrid-item': {
                          padding: '2px',
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'start',
                          alignItems: 'baseline',
                          gap: '2px',
                          fontSize: '14px',
                        },
                      }}
                    >
                      <Grid item xs={12} md={3}>
                        Username: <Typography sx={{ color: '#26787c', fontWeight: 700 }}>{user.userName}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        Name: <Typography sx={{ color: '#26787c', fontWeight: 700 }}>{user.name}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        Role: <Typography sx={{ color: '#26787c', fontWeight: 700 }}>{user.role}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        Active: <Typography sx={{ color: user.isActive ? '#26787c' : '#ea4335', fontWeight: 700 }}>{user.isActive ? 'Activate' : 'Deactivate'}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        Tạo bởi:
                        <Typography sx={{ color: '#26787c', fontWeight: 700 }}>
                          {user.createBy} ({formatDate(new Date(user.createDate))})
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        Thay đổi lần cuối:
                        <Typography sx={{ color: '#26787c', fontWeight: 700 }}>
                          {user.updateBy} ({formatDate(new Date(user.updateDate))})
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        Address: <Typography sx={{ color: '#26787c', fontWeight: 700 }}>{user.address}</Typography>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        Note: <Typography sx={{ color: '#26787c', fontWeight: 700 }}>{user.note}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        E-mail: <Typography sx={{ color: '#26787c', fontWeight: 700 }}>{user.email}</Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        Phone: <Typography sx={{ color: '#26787c', fontWeight: 700 }}>{user.phoneNumber}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'end',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <Button variant="contained" sx={{ backgroundColor: '#dbb789', '&:hover': { backgroundColor: '#8e7759' } }}>
                            Sửa
                          </Button>
                          <Button variant="contained" sx={{ backgroundColor: '#f44343', '&:hover': { backgroundColor: '#a72d2d' } }}>
                            Xóa
                          </Button>
                          <Button variant="contained" sx={{ backgroundColor: '#9fb55d', '&:hover': { backgroundColor: '#728242' } }}>
                            Đổi mật khẩu
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
                <Pagination sx={{ marginLeft: 'auto' }} onChange={(e, v) => setPage(v)} count={userTotalPage} size="small" />
              </Box>
            ) : tabIndex === 1 ? (
              <CreateAccount onFetchList={fetchUsers} />
            ) : (
              <></>
            )}
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
