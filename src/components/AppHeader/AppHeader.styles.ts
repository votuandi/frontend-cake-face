import { makeStyles } from 'tss-react/mui'

type IStyleParams = {}

const useStyles = makeStyles<{ params: IStyleParams }>({
  name: 'AppHeader',
  uniqId: 'app_header',
})((theme, { params }, classes) => {
  return {
    root: {
      width: '100vw',
      // height: '60px',
      minHeight: '60px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '4px 16px',
      // backgroundColor: '#AAE2A8',
      // background: 'linear-gradient(#c9ffcb, #e4f9c0)',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    },
  }
})

export default useStyles
