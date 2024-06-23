import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { CakeFaceActionTypes, GetCakeFaceDetailAction, GetCakeFaceListAction, GetCakeFaceListSuccessAction } from './cakeFace.types'
import {
  getCakeFaceDetailFailure,
  getCakeFaceDetailRequested,
  getCakeFaceDetailSuccess,
  getCakeFaceListFailure,
  getCakeFaceListRequested,
  getCakeFaceListSuccess,
} from './cakeFace.action'
import { cakeFaceApi } from '@/utils/api'

function* getCakeFaceList(action: GetCakeFaceListAction) {
  yield put(getCakeFaceListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof cakeFaceApi.getList>> = yield call(cakeFaceApi.getList, action.payload)
    if (response.status) {
      let resTotal = !isNaN(response.params.total) ? Number(response.params.total) : 0
      let resTotalActive = !isNaN(response.params.totalActive) ? Number(response.params.totalActive) : 0
      let resLimit = !isNaN(response.params.limit) ? Number(response.params.limit) : 0
      let totalPage = resTotal <= resLimit ? 1 : resTotal % resLimit === 0 ? resTotal / resLimit : Math.floor(resTotal / resLimit) + 1
      let totalPageActive = resTotalActive <= resLimit ? 1 : resTotalActive % resLimit === 0 ? resTotalActive / resLimit : Math.floor(resTotalActive / resLimit) + 1
      let getCakeFaceListSuccessPayload: GetCakeFaceListSuccessAction = {
        items: response.params.data ?? [],
        total: totalPage,
        totalActive: totalPageActive,
      }
      yield put(getCakeFaceListSuccess(getCakeFaceListSuccessPayload))
    } else {
      yield put(getCakeFaceListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getCakeFaceListFailure(message))
  }
}

function* getCakeFaceDetail(action: GetCakeFaceDetailAction) {
  yield put(getCakeFaceDetailRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof cakeFaceApi.getById>> = yield call(cakeFaceApi.getById, action.payload)
    if (response.status) {
      yield put(getCakeFaceDetailSuccess(response.params ?? null))
    } else {
      yield put(getCakeFaceDetailFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getCakeFaceDetailFailure(message))
  }
}

export default function* cakeFaceSaga() {
  yield all([takeEvery(CakeFaceActionTypes.GET_CAKE_FACE_LIST, getCakeFaceList), takeEvery(CakeFaceActionTypes.GET_CAKE_FACE_DETAIL, getCakeFaceDetail)])
}
