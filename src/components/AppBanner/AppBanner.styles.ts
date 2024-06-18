import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles({
  name: 'AppBanner',
  uniqId: 'app_banner',
})((theme, _, classes) => {
  return {
    root: {
      width: '100%',
    },
    bannerImage: {
      width: '100%',
    },
  }
})

export default useStyles
