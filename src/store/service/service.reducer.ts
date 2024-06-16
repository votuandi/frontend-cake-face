import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit'
import {
  getServiceDetailFailure,
  getServiceDetailRequested,
  getServiceDetailSuccess,
  getServiceListFailure,
  getServiceListRequested,
  getServiceListSuccess,
} from './service.action'
import { ServiceState } from './service.types'
import { IGetServiceDetailResponse, IServiceItem } from '@/utils/api/service'

const initialState: ServiceState = {
  serviceList: [],
  serviceListLoading: false,
  serviceListError: null,

  serviceDetail: null,
  serviceDetailLoading: false,
  serviceDetailError: null,
}

const serviceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getServiceListRequested, (state) => {
      state.serviceListLoading = true
      state.serviceListError = null
    })
    .addCase(getServiceListSuccess, (state, action: PayloadAction<IServiceItem[]>) => {
      state.serviceListLoading = false
      state.serviceList = action.payload
    })
    .addCase(getServiceListFailure, (state, action: PayloadAction<string>) => {
      state.serviceListLoading = false
      state.serviceListError = action.payload
    })

    .addCase(getServiceDetailRequested, (state) => {
      state.serviceDetailLoading = true
      state.serviceDetailError = null
    })
    .addCase(getServiceDetailSuccess, (state, action: PayloadAction<IGetServiceDetailResponse | null>) => {
      state.serviceDetailLoading = false
      state.serviceDetail = action.payload
    })
    .addCase(getServiceDetailFailure, (state, action: PayloadAction<string>) => {
      state.serviceDetailLoading = false
      state.serviceDetailError = action.payload
    })
})

export default serviceReducer
