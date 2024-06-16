import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({
  name: 'AppBanner',
  uniqId: 'app_banner',
})((theme, _, classes) => {
  return {
    root: {
      width: '100vw',
      height: '100vh',
    },
    bannerImage: {
      width: '100vw',
      height: '100vh',
    },
  }
})

export default useStyles
