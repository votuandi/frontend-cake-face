import
{ all, fork } from 'redux-saga/effects'
import userSaga from './user/user.saga'
import categorySaga from './category/category.saga'
import cakeFaceSaga from './cakeFace/cakeFace.saga'
import optionSaga from './option/option.saga'
import bannerSaga from './banner/banner.saga'
import sampleSaga from './sample/sample.saga'
import settingSaga from './setting/setting.saga'

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(categorySaga),
    fork(optionSaga),
    fork(cakeFaceSaga),
    fork(bannerSaga),
    fork(sampleSaga),
    fork(settingSaga)
  ])
}
