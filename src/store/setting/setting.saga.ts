import { IGetSchoolListPayload } from '../../utils/api/school/school.api.types'
// rootSaga.ts
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { GetSettingsAction, SettingActionTypes } from './setting.types'
import { settingApi } from '@/utils/api'
import { getSettingsFailure, getSettingsRequested, getSettingsSuccess } from './setting.action'

function* getSettings(action: GetSettingsAction) {
  yield put(getSettingsRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof settingApi.getSettings>> = yield call(settingApi.getSettings)
    if (response.status) {
      yield put(getSettingsSuccess(response.params ?? []))
    } else {
      yield put(getSettingsFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getSettingsFailure(message))
  }
}

export default function* settingSaga() {
  yield all([takeEvery(SettingActionTypes.GET_SETTINGS, getSettings)])
}
