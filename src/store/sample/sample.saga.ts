import { IGetSchoolListPayload } from '../../utils/api/school/school.api.types'
// rootSaga.ts
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { sampleApi } from '@/utils/api'
import { GetSampleBackgroundListAction, GetSampleBackgroundListSuccessAction, GetSamplePatternListAction, GetSamplePatternListSuccessAction, SampleActionTypes } from './sample.types'
import { getSampleBackgroundListFailure, getSampleBackgroundListRequested, getSampleBackgroundListSuccess, getSamplePatternListFailure, getSamplePatternListRequested, getSamplePatternListSuccess } from './sample.action'

function* getSampleBackgroundList(action: GetSampleBackgroundListAction) {
  yield put(getSampleBackgroundListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof sampleApi.getSampleBackgroundList>> = yield call(sampleApi.getSampleBackgroundList, action.payload)
    if (response.status) {
      let resTotal = !isNaN(response.params.total) ? Number(response.params.total) : 0
      let resTotalActive = !isNaN(response.params.totalActive) ? Number(response.params.totalActive) : 0
      let resLimit = !isNaN(response.params.limit) ? Number(response.params.limit) : 0
      let totalPage = resTotal <= resLimit ? 1 : resTotal % resLimit === 0 ? resTotal / resLimit : Math.floor(resTotal / resLimit) + 1
      let totalPageActive = resTotalActive <= resLimit ? 1 : resTotalActive % resLimit === 0 ? resTotalActive / resLimit : Math.floor(resTotalActive / resLimit) + 1
      let getSampleBackgroundListSuccessPayload: GetSampleBackgroundListSuccessAction = {
        items: response.params.data ?? [],
        total: totalPage,
        totalActive: totalPageActive,
      }
      yield put(getSampleBackgroundListSuccess(getSampleBackgroundListSuccessPayload))
    } else {
      yield put(getSampleBackgroundListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getSampleBackgroundListFailure(message))
  }
}

function* getSamplePatternList(action: GetSamplePatternListAction) {
  yield put(getSamplePatternListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof sampleApi.getSamplePatternList>> = yield call(sampleApi.getSamplePatternList, action.payload)
    if (response.status) {
      let resTotal = !isNaN(response.params.total) ? Number(response.params.total) : 0
      let resTotalActive = !isNaN(response.params.totalActive) ? Number(response.params.totalActive) : 0
      let resLimit = !isNaN(response.params.limit) ? Number(response.params.limit) : 0
      let totalPage = resTotal <= resLimit ? 1 : resTotal % resLimit === 0 ? resTotal / resLimit : Math.floor(resTotal / resLimit) + 1
      let totalPageActive = resTotalActive <= resLimit ? 1 : resTotalActive % resLimit === 0 ? resTotalActive / resLimit : Math.floor(resTotalActive / resLimit) + 1
      let getSamplePatternListSuccessPayload: GetSamplePatternListSuccessAction = {
        items: response.params.data ?? [],
        total: totalPage,
        totalActive: totalPageActive,
      }
      yield put(getSamplePatternListSuccess(getSamplePatternListSuccessPayload))
    } else {
      yield put(getSamplePatternListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getSamplePatternListFailure(message))
  }
}

export default function* sampleSaga() {
  yield all([takeEvery(SampleActionTypes.GET_SAMPLE_BACKGROUND_LIST, getSampleBackgroundList)])
  yield all([takeEvery(SampleActionTypes.GET_SAMPLE_PATTERN_LIST, getSamplePatternList)])
}
