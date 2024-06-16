import { IGetSchoolListPayload } from '../../utils/api/school/school.api.types'
// rootSaga.ts
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { schoolApi, serviceApi } from '@/utils/api'
import { axiosHelpers } from '@/utils/helpers'
import { TakeableChannel } from 'redux-saga'
import { GetServiceDetailAction, GetServiceListAction, ServiceActionTypes } from './service.types'
import {
  getServiceDetailFailure,
  getServiceDetailRequested,
  getServiceDetailSuccess,
  getServiceListFailure,
  getServiceListRequested,
  getServiceListSuccess,
} from './service.action'

function* getServiceList(action: GetServiceListAction) {
  yield put(getServiceListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof serviceApi.getServiceList>> = yield call(serviceApi.getServiceList, action.payload)
    if (response.status) {
      yield put(getServiceListSuccess(response.params ?? []))
    } else {
      yield put(getServiceListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getServiceListFailure(message))
  }
}

function* getServiceDetail(action: GetServiceDetailAction) {
  yield put(getServiceDetailRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof serviceApi.getServiceDetail>> = yield call(serviceApi.getServiceDetail, action.payload)
    if (response.status) {
      yield put(getServiceDetailSuccess(response.params))
    } else {
      yield put(getServiceDetailFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getServiceDetailFailure(message))
  }
}

export default function* serviceSaga() {
  yield all([takeEvery(ServiceActionTypes.GET_SERVICE_LIST, getServiceList), takeEvery(ServiceActionTypes.GET_SERVICE_DETAIL, getServiceDetail)])
}
