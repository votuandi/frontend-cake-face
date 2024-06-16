import { makeStyles } from 'tss-react/mui'

type IStyleParams = {
  isUnderBanner: boolean
  isUnderMobile: boolean
  isShowMobileMenu: boolean
  isHomePage: boolean
}

const useStyles = makeStyles<{ params: IStyleParams }>({
  name: 'AppHeader',
  uniqId: 'app_header',
})((theme, { params }, classes) => {
  return {
    root: {
      width: '100vw',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: !params.isHomePage ? '#fff' : params.isUnderBanner ? '#fff' : 'transparent',
      boxShadow: !params.isHomePage ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : params.isUnderBanner ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    },

    rootMobile: {
      width: '100vw',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: !params.isHomePage ? '#fff' : params.isShowMobileMenu ? '#fff' : params.isUnderMobile ? '#fff' : 'transparent',
      boxShadow: !params.isHomePage
        ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
        : params.isShowMobileMenu
        ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
        : params.isUnderMobile
        ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
        : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    },

    mobileMenuContainer: {
      position: 'fixed',
      top: params.isShowMobileMenu ? 0 : '-100vh',
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 99,
      backgroundColor: 'rgb(256,256,256,0.9)',
      animation: params.isShowMobileMenu ? 'slideInDown 0.5s ease-in-out' : 'slideOutUp 0.5s ease-in-out',
    },

    menu: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'start',
      color: 'black',
      gap: '20px',
      margin: '0 auto',
    },

    menuTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'stretch',
      position: 'relative',
      gap: 0,

      '&:hover': {
        '& span': {
          '&::after': {
            content: '""',
            display: 'block',
            height: '0',
            width: '100%',
            borderBottom: `1px solid ${!params.isHomePage ? '#020000' : params.isUnderBanner ? '#020000' : '#fff'}`,
            animationName: '$slideInLeft',
            animationDuration: '1s',
            animationFillMode: 'both',
            '@keyframes slideInLeft': {
              '0%': {
                transform: 'translateX(-100%)',
                visibility: 'visible',
              },
              '100%': {
                transform: 'translateX(0)',
              },
            },
          },
        },
      },
    },

    menuText: {
      fontFamily: 'Mulish',
      fontSize: 11,
      color: !params.isHomePage ? '#020000' : params.isUnderBanner ? '#020000' : '#fff',
      fontWeight: 500,
      textTransform: 'uppercase',
      lineHeight: '23px',
      letterSpacing: '.3em',
      cursor: 'pointer',
      position: 'relative',
    },
  }
})

export default useStyles
