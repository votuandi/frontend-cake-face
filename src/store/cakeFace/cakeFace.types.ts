import { CAKE_FACE_ITEM_TYPE, GET_CAKE_FACE_LIST_PAYLOAD } from '@/utils/api/cakeFace'

export enum CakeFaceActionTypes {
  GET_CAKE_FACE_LIST_REQUESTED = 'cakeFace/getCakeFaceListRequested',
  GET_CAKE_FACE_LIST_SUCCESSFUL = 'cakeFace/getCakeFaceListSuccessful',
  GET_CAKE_FACE_LIST_FAILED = 'cakeFace/getCakeFaceListFailed',
  GET_CAKE_FACE_LIST = 'cakeFace/getCakeFaceList',

  GET_TRENDY_CAKE_FACE_LIST_REQUESTED = 'cakeFace/getTrendyCakeFaceListRequested',
  GET_TRENDY_CAKE_FACE_LIST_SUCCESSFUL = 'cakeFace/getTrendyCakeFaceListSuccessful',
  GET_TRENDY_CAKE_FACE_LIST_FAILED = 'cakeFace/getTrendyCakeFaceListFailed',
  GET_TRENDY_CAKE_FACE_LIST = 'cakeFace/getTrendyCakeFaceList',

  GET_CAKE_FACE_DETAIL_REQUESTED = 'cakeFace/getCakeFaceDetailRequested',
  GET_CAKE_FACE_DETAIL_SUCCESSFUL = 'cakeFace/getCakeFaceDetailSuccessful',
  GET_CAKE_FACE_DETAIL_FAILED = 'cakeFace/getCakeFaceDetailFailed',
  GET_CAKE_FACE_DETAIL = 'cakeFace/getCakeFaceDetail',
}

export interface CakeFaceState {
  cakeFaceList: CAKE_FACE_ITEM_TYPE[]
  cakeFaceTotalPage: number
  cakeFaceTotalPageActive: number
  cakeFaceListLoading: boolean
  cakeFaceListError: string | null

  trendyCakeFaceList: CAKE_FACE_ITEM_TYPE[]
  trendyCakeFaceListLoading: boolean
  trendyCakeFaceListError: string | null

  cakeFaceDetail: CAKE_FACE_ITEM_TYPE | null
  cakeFaceDetailLoading: boolean
  cakeFaceDetailError: string | null
}

export type GetCakeFaceListSuccessAction = { items: CAKE_FACE_ITEM_TYPE[]; total: number; totalActive: number }
export type GetCakeFaceListAction = { payload: GET_CAKE_FACE_LIST_PAYLOAD; type: CakeFaceActionTypes.GET_CAKE_FACE_LIST }

export type GetTrendyCakeFaceListAction = { payload: GET_CAKE_FACE_LIST_PAYLOAD; type: CakeFaceActionTypes.GET_TRENDY_CAKE_FACE_LIST }

export type GetCakeFaceDetailAction = { payload: string; type: CakeFaceActionTypes.GET_CAKE_FACE_DETAIL }
