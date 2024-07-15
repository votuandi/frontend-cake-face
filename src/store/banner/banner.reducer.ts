import { USER_INFORMATION_TYPE } from './../../utils/api/auth/auth.api.types'
import { createAction, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BannerState } from './banner.types'
import { getBannersFailure, getBannersRequested, getBannersSuccess } from './banner.action'
import { BANNER_ITEM } from '@/utils/api/banner'

const initialState: BannerState = {
  banners: [],
  bannersLoading: false,
  bannersError: null,
}

const bannerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getBannersRequested, (state) => {
      state.bannersLoading = true
      state.bannersError = null
    })
    .addCase(getBannersSuccess, (state, action: PayloadAction<BANNER_ITEM[]>) => {
      state.bannersLoading = false
      state.banners = action.payload
    })
    .addCase(getBannersFailure, (state, action: PayloadAction<string>) => {
      state.bannersLoading = false
      state.bannersError = action.payload
    })
})

export default bannerReducer
