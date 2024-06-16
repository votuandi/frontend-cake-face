import { makeStyles } from 'tss-react/mui'

type IStyleParams = {}

const useStyles = makeStyles<{ params: IStyleParams }>({
  name: 'Home',
  uniqId: 'home',
})((theme, { params }, classes) => {
  return {
    root: {},
    slider: {
      '& .slick-dots': {
        bottom: 16,

        '& li': {
          margin: 0,

          '& button': {
            width: 15,
            height: 15,
            fontSize: 15,
          },
        },
      },
    },
    mainContent: {
      padding: '60px 24px 50px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 60,
    },
  }
})

export default useStyles
