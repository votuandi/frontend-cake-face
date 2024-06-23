import { IGetSchoolListPayload } from '../../utils/api/school/school.api.types'
// rootSaga.ts
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import { GetOptionListAction, GetOptionListSuccessAction, OptionActionTypes } from './option.types'
import { getOptionListFailure, getOptionListRequested, getOptionListSuccess } from './option.action'
import { optionApi } from '@/utils/api'

function* getOptionList(action: GetOptionListAction) {
  yield put(getOptionListRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof optionApi.getList>> = yield call(optionApi.getList, action.payload)
    if (response.status) {
      let resTotal = !isNaN(response.params.total) ? Number(response.params.total) : 0
      let resTotalActive = !isNaN(response.params.totalActive) ? Number(response.params.totalActive) : 0
      let resLimit = !isNaN(response.params.limit) ? Number(response.params.limit) : 0
      let totalPage = resTotal <= resLimit ? 1 : resTotal % resLimit === 0 ? resTotal / resLimit : Math.floor(resTotal / resLimit) + 1
      let totalPageActive = resTotalActive <= resLimit ? 1 : resTotalActive % resLimit === 0 ? resTotalActive / resLimit : Math.floor(resTotalActive / resLimit) + 1
      let getOptionListSuccessPayload: GetOptionListSuccessAction = {
        items: response.params.data ?? [],
        total: totalPage,
        totalActive: totalPageActive,
      }
      yield put(getOptionListSuccess(getOptionListSuccessPayload))
    } else {
      yield put(getOptionListFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getOptionListFailure(message))
  }
}

export default function* optionSaga() {
  yield all([takeEvery(OptionActionTypes.GET_OPTION_LIST, getOptionList)])
}
