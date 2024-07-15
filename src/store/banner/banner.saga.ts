import { IGetSchoolListPayload } from '../../utils/api/school/school.api.types'
// rootSaga.ts
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import { BannerActionTypes, GetBannersAction } from './banner.types'
import { getBannersFailure, getBannersRequested, getBannersSuccess } from './banner.action'
import bannerApi from '@/utils/api/banner'

function* getBanners(action: GetBannersAction) {
  yield put(getBannersRequested())
  try {
    const { data: response }: Awaited<ReturnType<typeof bannerApi.getBanners>> = yield call(bannerApi.getBanners)
    if (response.status) {
      yield put(getBannersSuccess(response.params ?? []))
    } else {
      yield put(getBannersFailure(response.message))
    }
  } catch (error) {
    if (axios.isCancel(error)) return
    const message = axios.isAxiosError(error) ? (error.response?.data as any)?.message || error.message : ''
    yield put(getBannersFailure(message))
  }
}

export default function* bannerSaga() {
  yield all([takeEvery(BannerActionTypes.GET_BANNERS, getBanners)])
}
