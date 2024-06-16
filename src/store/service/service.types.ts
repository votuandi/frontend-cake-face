import { IGetServiceDetailPayload, IGetServiceDetailResponse, IGetServiceListPayload, IServiceItem } from '@/utils/api/service'

export enum ServiceActionTypes {
  GET_SERVICE_LIST_REQUESTED = 'service/getServiceListRequested',
  GET_SERVICE_LIST_SUCCESSFUL = 'service/getServiceListSuccessful',
  GET_SERVICE_LIST_FAILED = 'service/getServiceListFailed',
  GET_SERVICE_LIST = 'service/getServiceList',

  GET_SERVICE_DETAIL_REQUESTED = 'service/getServiceDetailRequested',
  GET_SERVICE_DETAIL_SUCCESSFUL = 'service/getServiceDetailSuccessful',
  GET_SERVICE_DETAIL_FAILED = 'service/getServiceDetailFailed',
  GET_SERVICE_DETAIL = 'service/getServiceDetail',
}

export interface ServiceState {
  serviceList: IServiceItem[]
  serviceListLoading: boolean
  serviceListError: string | null

  serviceDetail: IGetServiceDetailResponse | null
  serviceDetailLoading: boolean
  serviceDetailError: string | null
}

export type GetServiceListAction = { payload: IGetServiceListPayload; type: ServiceActionTypes.GET_SERVICE_LIST }
export type GetServiceDetailAction = { payload: IGetServiceDetailPayload; type: ServiceActionTypes.GET_SERVICE_LIST }
