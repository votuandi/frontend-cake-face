import { makeStyles } from 'tss-react/mui'

type IStyleParams = {}

const useStyles = makeStyles<{ params: IStyleParams }>({
  name: 'AppAdminMenu',
  uniqId: 'AppAdminMenu',
})((theme, { params }, classes) => {
  return {}
})

export default useStyles
