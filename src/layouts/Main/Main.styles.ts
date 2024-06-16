import { makeStyles } from 'tss-react/mui'

export type IStyleParams = {}

const useStyles = makeStyles<{ params: IStyleParams }>({
  name: 'MainLayout',
  uniqId: 'main_layout',
})((theme, { params }, classes) => {
  return {
    childrenContainer: {},
  }
})

export default useStyles
