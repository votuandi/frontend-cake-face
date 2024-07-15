import { makeStyles } from 'tss-react/mui'

type IStyleParams = {}

const useStyles = makeStyles<{ params: IStyleParams }>({
  name: 'Contact',
  uniqId: 'Contact',
})((theme, { params }, classes) => {
  return {
    root: {},
    textField: {
      '& fieldset': {
        borderColor: '#26787c',
      },
    },
  }
})

export default useStyles
