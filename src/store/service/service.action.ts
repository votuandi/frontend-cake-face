import { IGetSchoolListPayload, ISchoolItem } from '@/utils/api/school'
import { createAction } from '@reduxjs/toolkit'
import { ServiceActionTypes } from './service.types'
import { IGetServiceDetailPayload, IGetServiceDetailResponse, IGetServiceListPayload, IServiceItem } from '@/utils/api/service'

export const getServiceListRequested = createAction<void>(ServiceActionTypes.GET_SERVICE_LIST_REQUESTED)
export const getServiceListSuccess = createAction<IServiceItem[]>(ServiceActionTypes.GET_SERVICE_LIST_SUCCESSFUL)
export const getServiceListFailure = createAction<string>(ServiceActionTypes.GET_SERVICE_LIST_FAILED)
export const getServiceList = createAction<IGetServiceListPayload>(ServiceActionTypes.GET_SERVICE_LIST)

export const getServiceDetailRequested = createAction<void>(ServiceActionTypes.GET_SERVICE_DETAIL_REQUESTED)
export const getServiceDetailSuccess = createAction<IGetServiceDetailResponse | null>(ServiceActionTypes.GET_SERVICE_DETAIL_SUCCESSFUL)
export const getServiceDetailFailure = createAction<string>(ServiceActionTypes.GET_SERVICE_DETAIL_FAILED)
export const getServiceDetail = createAction<IGetServiceDetailPayload>(ServiceActionTypes.GET_SERVICE_DETAIL)
