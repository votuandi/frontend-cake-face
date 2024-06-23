import { IGetSchoolListPayload } from '../../utils/api/school/school.api.types'
// rootSaga.ts
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { userApi } from '@/utils/api'
import { GetCurrentUserInfoAction, UserActionTypes } from './user.types'
import { getCurrentUserInfoFailure, getCurrentUserInfoRequested, getCurrentUserInfoSuccess } from './user.action'

function* getCurrentUserInfo(action: GetCurrentUserInfoAction) {
  yield put(getCurrentUserInfoRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof userApi.getCurrentUserInfo>> = yield call(userApi.getCurrentUserInfo)
    if (response.status) {
      yield put(getCurrentUserInfoSuccess(response.params ?? []))
    } else {
      yield put(getCurrentUserInfoFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getCurrentUserInfoFailure(message))
  }
}

export default function* userSaga() {
  yield all([takeEvery(UserActionTypes.GET_CURRENT_USER_INFO, getCurrentUserInfo)])
}
