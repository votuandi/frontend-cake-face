import { all, fork } from 'redux-saga/effects'

import schoolSaga from './school/school.saga'
import serviceSaga from './service/service.saga'

export default function* rootSaga() {
  yield all([fork(schoolSaga), fork(serviceSaga)])
}
