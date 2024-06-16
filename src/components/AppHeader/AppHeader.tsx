import * as React from 'react'

import { FormControlLabel, Checkbox, CheckboxProps, Box, Button, Typography } from '@mui/material'
import useStyles from './AppHeader.styles'
import router, { useRouter } from 'next/router'
import { MENU, MENU_ITEM_TYPE } from '@/utils/constants/menu.constant'
import { gotoPage, localStorageAvailable } from '@/utils/helpers/common'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import theme from '@/assets/theme'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'

type IProps = {}

const AppHeader = (props: IProps, ref: React.ForwardedRef<any>) => {
  const { t, i18n } = useTranslation()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down(1200))
  const router = useRouter()

  const [isUnderBanner, setIsUnderBanner] = useState<boolean>(false)
  const [isUnderMobile, setIsUnderMobile] = useState<boolean>(false)
  const [showSubMenu, setShowSubMenu] = useState<boolean[]>([])
  const [showMobileSubMenu, setShowMobileSubMenu] = useState<boolean[]>([])
  const [isShowMobileMenu, setIsShowMobileMenu] = useState<boolean>(false)

  const handleScroll = () => {
    setIsUnderBanner(window.scrollY > window.innerHeight)
    setIsUnderMobile(window.scrollY > window.innerHeight * 0.1)
  }

  const handleHoverMenuItem = (index: number) => {
    let newShowSubMenu = Array(showSubMenu.length).fill(false)
    newShowSubMenu[index] = true
    setShowSubMenu([...newShowSubMenu])
  }

  const handleLeaveMenuItem = (index: number) => {
    setShowSubMenu([...Array(showSubMenu.length).fill(false)])
  }

  const toggleShowMobileMenu = () => {
    setIsShowMobileMenu((x) => !x)
  }

  const handleClickMobileMenuItem = (item: MENU_ITEM_TYPE, index: number) => {
    if (item.subMenu && item.subMenu?.length > 0) {
      let newShowMobileSubMenu = [...showMobileSubMenu]
      newShowMobileSubMenu[index] = !showMobileSubMenu[index]
      setShowMobileSubMenu([...newShowMobileSubMenu])
    } else {
      gotoPage(item.path)
    }
  }

  const handleClickMobileSubMenuItem = (path: string) => {
    gotoPage(path)
    setIsShowMobileMenu(false)
    setShowMobileSubMenu([...Array(MENU.length).fill(false)])
  }

  const handleClickMenuItem = (item: MENU_ITEM_TYPE) => {
    if (item.subMenu && item.subMenu?.length > 0) return
    gotoPage(item.path)
  }

  useEffect(() => {
    setShowSubMenu([...Array(MENU.length).fill(false)])
    setShowMobileSubMenu([...Array(MENU.length).fill(false)])

    // Add event listener when the component mounts
    window.addEventListener('scroll', handleScroll)

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const { classes } = useStyles({
    params: {
      isUnderBanner: isUnderBanner,
      isUnderMobile: isUnderMobile,
      isShowMobileMenu: isShowMobileMenu,
      isHomePage: router.pathname === '/',
    },
  })

  return isSmallScreen ? (
    <>
      <Box className={classes.rootMobile}>
        <Typography
          variant="bodyMed14"
          sx={{
            color: router.pathname === '/' ? (isShowMobileMenu ? '#020000' : isUnderMobile ? '#020000' : 'white') : '#020000',
            fontFamily: 'Mulish',
            fontSize: 14,
            fontWeight: 700,
            textTransform: 'uppercase',
            lineHeight: '23px',
            letterSpacing: '.3em',
            cursor: 'pointer',
          }}
          onClick={() => gotoPage('/')}
        >
          KY ANH NGUYEN
        </Typography>
        <IconButton
          sx={{
            padding: '12px',
            cursor: 'pointer',
            color: router.pathname === '/' ? (isShowMobileMenu ? '#020000' : isUnderMobile ? '#020000' : 'white') : '#020000',
          }}
          onClick={toggleShowMobileMenu}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      {/* <Box className={` ${classes.mobileMenuContainer}`}></Box> */}
      <>
        {isShowMobileMenu && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99,
              backgroundColor: 'rgba(256, 256, 256, 0.9)',
              animation: 'slideInDown 0.5s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              overflow: 'auto',
              paddingY: '100px',
            }}
            className="custom-scrollbar"
          >
            {MENU.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    variant="text"
                    sx={{
                      width: '100%',
                      padding: '16px',
                      color: '#020000',
                      fontFamily: 'Mulish',
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      lineHeight: '23px',
                      letterSpacing: '.3em',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleClickMobileMenuItem(item, index)}
                  >
                    {item.title}
                  </Button>
                  {item.subMenu &&
                    item.subMenu?.length > 0 &&
                    showMobileSubMenu[index] &&
                    item.subMenu.map((subItem, subIndex) => {
                      return (
                        <Button
                          key={subIndex}
                          variant="text"
                          sx={{
                            width: '100%',
                            padding: '12px',
                            color: '#020000',
                            fontFamily: 'Mulish',
                            fontSize: 11,
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            lineHeight: '23px',
                            letterSpacing: '.3em',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleClickMobileSubMenuItem(subItem.path)}
                        >
                          {subItem.title}
                        </Button>
                      )
                    })}
                </Box>
              )
            })}
          </Box>
        )}

        {!isShowMobileMenu && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 99,
              backgroundColor: 'rgba(256, 256, 256, 0.9)',
              animation: 'slideOutUp 0.5s ease-in-out',
              animationFillMode: 'forwards', // Retain styles from the last keyframe
            }}
          ></Box>
        )}
      </>
    </>
  ) : (
    <Box className={classes.root}>
      <Box className={classes.menu}>
        {MENU.map((item, index) => {
          return (
            <Box key={index} className={classes.menuTextContainer} onMouseEnter={() => handleHoverMenuItem(index)} onMouseLeave={() => handleLeaveMenuItem(index)}>
              <span className={classes.menuText} onClick={() => handleClickMenuItem(item)}>
                {item.title}
              </span>
              {item.subMenu && showSubMenu[index] && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: '-20px',
                    top: 0,
                    minWidth: 'calc(100% + 40px)',
                    paddingTop: '50px',
                    backgroundColor: isUnderBanner ? '#fff' : 'transparent',
                    zIndex: -1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '12px 20px',
                      backgroundColor: '#fff',
                      boxShadow: isUnderBanner ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : 'none',
                    }}
                  >
                    {item.subMenu.map((subItem, subIndex) => {
                      return (
                        <Box
                          key={subIndex}
                          sx={{
                            color: '#020000',
                            fontFamily: 'Mulish',
                            fontSize: 11,
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            lineHeight: '23px',
                            letterSpacing: '.3em',
                            cursor: 'pointer',

                            '&:hover': {
                              fontWeight: 700,
                            },
                          }}
                          onClick={() => gotoPage(subItem.path)}
                        >
                          {subItem.title}
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              )}
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default React.forwardRef(AppHeader)
