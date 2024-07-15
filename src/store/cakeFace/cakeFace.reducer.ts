import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CakeFaceState, GetCakeFaceListSuccessAction } from './cakeFace.types'
import {
  getCakeFaceDetailFailure,
  getCakeFaceDetailRequested,
  getCakeFaceDetailSuccess,
  getCakeFaceListFailure,
  getCakeFaceListRequested,
  getCakeFaceListSuccess,
  getTrendyCakeFaceListFailure,
  getTrendyCakeFaceListRequested,
  getTrendyCakeFaceListSuccess,
} from './cakeFace.action'
import { CAKE_FACE_ITEM_TYPE } from '@/utils/api/cakeFace'

const initialState: CakeFaceState = {
  cakeFaceList: [],
  cakeFaceTotalPage: 1,
  cakeFaceTotalPageActive: 1,
  cakeFaceListLoading: false,
  cakeFaceListError: null,

  cakeFaceDetail: null,
  cakeFaceDetailLoading: false,
  cakeFaceDetailError: null,

  trendyCakeFaceList: [],
  trendyCakeFaceListLoading: false,
  trendyCakeFaceListError: null,
}

const cakeFaceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCakeFaceListRequested, (state) => {
      state.cakeFaceListLoading = true
      state.cakeFaceListError = null
    })
    .addCase(getCakeFaceListSuccess, (state, action: PayloadAction<GetCakeFaceListSuccessAction>) => {
      state.cakeFaceListLoading = false
      state.cakeFaceList = action.payload.items
      state.cakeFaceTotalPage = action.payload.total
      state.cakeFaceTotalPageActive = action.payload.totalActive
    })
    .addCase(getCakeFaceListFailure, (state, action: PayloadAction<string>) => {
      state.cakeFaceListLoading = false
      state.cakeFaceListError = action.payload
    })

    .addCase(getTrendyCakeFaceListRequested, (state) => {
      state.trendyCakeFaceListLoading = true
      state.trendyCakeFaceListError = null
    })
    .addCase(getTrendyCakeFaceListSuccess, (state, action: PayloadAction<CAKE_FACE_ITEM_TYPE[]>) => {
      state.trendyCakeFaceListLoading = false
      state.trendyCakeFaceList = action.payload
    })
    .addCase(getTrendyCakeFaceListFailure, (state, action: PayloadAction<string>) => {
      state.trendyCakeFaceListLoading = false
      state.trendyCakeFaceListError = action.payload
    })

    .addCase(getCakeFaceDetailRequested, (state) => {
      state.cakeFaceDetailLoading = true
      state.cakeFaceDetailError = null
    })
    .addCase(getCakeFaceDetailSuccess, (state, action: PayloadAction<CAKE_FACE_ITEM_TYPE>) => {
      state.cakeFaceDetailLoading = false
      state.cakeFaceDetail = action.payload
    })
    .addCase(getCakeFaceDetailFailure, (state, action: PayloadAction<string>) => {
      state.cakeFaceDetailLoading = false
      state.cakeFaceDetailError = action.payload
    })
})

export default cakeFaceReducer
