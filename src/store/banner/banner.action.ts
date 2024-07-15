import { BANNER_ITEM } from '@/utils/api/banner'
import { createAction } from '@reduxjs/toolkit'
import { BannerActionTypes } from './banner.types'

export const getBannersRequested = createAction<void>(BannerActionTypes.GET_BANNERS_REQUESTED)
export const getBannersSuccess = createAction<BANNER_ITEM[]>(BannerActionTypes.GET_BANNERS_SUCCESSFUL)
export const getBannersFailure = createAction<string>(BannerActionTypes.GET_BANNERS_FAILED)
export const getBanners = createAction(BannerActionTypes.GET_BANNERS)
