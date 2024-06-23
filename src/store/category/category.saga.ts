import { IGetSchoolListPayload } from '../../utils/api/school/school.api.types'
// rootSaga.ts
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { categoryApi, schoolApi } from '@/utils/api'
import { CategoryActionTypes, GetCategoryListAction, GetCategoryListSuccessAction } from './category.types'
import { getCategoryListFailure, getCategoryListRequested, getCategoryListSuccess } from './category.action'

function* getCategoryList(action: GetCategoryListAction) {
  yield put(getCategoryListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof categoryApi.getList>> = yield call(categoryApi.getList, action.payload)
    if (response.status) {
      let resTotal = !isNaN(response.params.total) ? Number(response.params.total) : 0
      let resTotalActive = !isNaN(response.params.totalActive) ? Number(response.params.totalActive) : 0
      let resLimit = !isNaN(response.params.limit) ? Number(response.params.limit) : 0
      let totalPage = resTotal <= resLimit ? 1 : resTotal % resLimit === 0 ? resTotal / resLimit : Math.floor(resTotal / resLimit) + 1
      let totalPageActive = resTotalActive <= resLimit ? 1 : resTotalActive % resLimit === 0 ? resTotalActive / resLimit : Math.floor(resTotalActive / resLimit) + 1
      let getCategoryListSuccessPayload: GetCategoryListSuccessAction = {
        items: response.params.data ?? [],
        total: totalPage,
        totalActive: totalPageActive,
      }
      yield put(getCategoryListSuccess(getCategoryListSuccessPayload))
    } else {
      yield put(getCategoryListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getCategoryListFailure(message))
  }
}

export default function* categorySaga() {
  yield all([takeEvery(CategoryActionTypes.GET_CATEGORY_LIST, getCategoryList)])
}
