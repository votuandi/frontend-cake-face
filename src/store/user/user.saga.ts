import { IGetSchoolListPayload } from '../../utils/api/school/school.api.types'
// rootSaga.ts
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { userApi } from '@/utils/api'
import { GetCurrentUserInfoAction, GetUserListAction, GetUserListSuccessAction, UserActionTypes } from './user.types'
import { getCurrentUserInfoFailure, getCurrentUserInfoRequested, getCurrentUserInfoSuccess, getUserListFailure, getUserListRequested, getUserListSuccess } from './user.action'

function* getCurrentUserInfo(action: GetCurrentUserInfoAction) {
  yield put(getCurrentUserInfoRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof userApi.getCurrentUserInfo>> = yield call(userApi.getCurrentUserInfo)
    if (response.status) {
      yield put(getCurrentUserInfoSuccess(response.params ?? null))
    } else {
      yield put(getCurrentUserInfoFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getCurrentUserInfoFailure(message))
  }
}

function* getUserList(action: GetUserListAction) {
  yield put(getUserListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof userApi.getUserList>> = yield call(userApi.getUserList, action.payload)
    if (response.status) {
      let resTotal = !isNaN(response.params.total) ? Number(response.params.total) : 0
      let resTotalActive = !isNaN(response.params.totalActive) ? Number(response.params.totalActive) : 0
      let resLimit = !isNaN(response.params.limit) ? Number(response.params.limit) : 0
      let totalPage = resTotal <= resLimit ? 1 : resTotal % resLimit === 0 ? resTotal / resLimit : Math.floor(resTotal / resLimit) + 1
      let totalPageActive = resTotalActive <= resLimit ? 1 : resTotalActive % resLimit === 0 ? resTotalActive / resLimit : Math.floor(resTotalActive / resLimit) + 1
      let getUserListSuccessPayload: GetUserListSuccessAction = {
        items: response.params.data ?? [],
        total: totalPage,
        totalActive: totalPageActive,
      }
      yield put(getUserListSuccess(getUserListSuccessPayload))
    } else {
      yield put(getUserListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getUserListFailure(message))
  }
}

export default function* userSaga() {
  yield all([takeEvery(UserActionTypes.GET_CURRENT_USER_INFO, getCurrentUserInfo), takeEvery(UserActionTypes.GET_USER_LIST, getUserList)])
}
