import { IGetSchoolListPayload } from './../../utils/api/school/school.api.types'
// rootSaga.ts
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { schoolApi } from '@/utils/api'
import { axiosHelpers } from '@/utils/helpers'
import {
  GetAdmissionSchoolListAction,
  GetAdmissionSchoolListSuccessAction,
  GetRecommendedSchoolListAction,
  GetSchoolCategoryDetailAction,
  GetSchoolCategoryListAction,
  SchoolActionTypes,
} from './school.types'
import { TakeableChannel } from 'redux-saga'
import {
  getAdmissionSchoolListFailure,
  getAdmissionSchoolListRequested,
  getAdmissionSchoolListSuccess,
  getRecommendedSchoolListFailure,
  getRecommendedSchoolListRequested,
  getRecommendedSchoolListSuccess,
  getSchoolCategoryDetailFailure,
  getSchoolCategoryDetailRequested,
  getSchoolCategoryDetailSuccess,
  getSchoolCategoryListFailure,
  getSchoolCategoryListRequested,
  getSchoolCategoryListSuccess,
} from './school.action'

function* getRecommendedSchoolList(action: GetRecommendedSchoolListAction) {
  yield put(getRecommendedSchoolListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof schoolApi.getSchoolList>> = yield call(schoolApi.getSchoolList, action.payload)
    if (response.status) {
      yield put(getRecommendedSchoolListSuccess(response.params.School ?? []))
    } else {
      yield put(getRecommendedSchoolListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getRecommendedSchoolListFailure(message))
  }
}

function* getAdmissionSchoolList(action: GetAdmissionSchoolListAction) {
  yield put(getAdmissionSchoolListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof schoolApi.getSchoolList>> = yield call(schoolApi.getSchoolList, action.payload)
    if (response.status) {
      let resTotal = !isNaN(response.params.total_record) ? Number(response.params.total_record) : 0
      let resLimit = !isNaN(response.params.limit) ? Number(response.params.limit) : 0
      let totalPage = resTotal <= resLimit ? 1 : resTotal % resLimit === 0 ? resTotal / resLimit : Math.floor(resTotal / resLimit) + 1
      let getAdmissionSchoolListSuccessPayload: GetAdmissionSchoolListSuccessAction = {
        items: response.params.School ?? [],
        totalPage,
      }
      yield put(getAdmissionSchoolListSuccess(getAdmissionSchoolListSuccessPayload))
    } else {
      yield put(getAdmissionSchoolListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getAdmissionSchoolListFailure(message))
  }
}

function* getSchoolCategoryList(action: GetSchoolCategoryListAction) {
  yield put(getSchoolCategoryListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof schoolApi.getSchoolCategoryList>> = yield call(schoolApi.getSchoolCategoryList, action.payload)
    if (response.status) {
      yield put(getSchoolCategoryListSuccess(response.params ?? []))
    } else {
      yield put(getSchoolCategoryListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getSchoolCategoryListFailure(message))
  }
}

function* getSchoolCategoryDetail(action: GetSchoolCategoryDetailAction) {
  yield put(getSchoolCategoryDetailRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof schoolApi.getSchoolCategoryDetail>> = yield call(schoolApi.getSchoolCategoryDetail, action.payload)
    if (response.status) {
      yield put(getSchoolCategoryDetailSuccess(response.params ?? null))
    } else {
      yield put(getSchoolCategoryDetailFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getSchoolCategoryDetailFailure(message))
  }
}

export default function* schoolSaga() {
  yield all([
    takeEvery(SchoolActionTypes.GET_RECOMMENDED_SCHOOL_LIST, getRecommendedSchoolList),
    takeEvery(SchoolActionTypes.GET_ADMISSION_SCHOOL_LIST, getAdmissionSchoolList),
    takeEvery(SchoolActionTypes.GET_SCHOOL_CATEGORY_LIST, getSchoolCategoryList),
    takeEvery(SchoolActionTypes.GET_SCHOOL_CATEGORY_DETAIL, getSchoolCategoryDetail),
  ])
}
