import { createAction } from '@reduxjs/toolkit'
import { CakeFaceActionTypes, GetCakeFaceListSuccessAction } from './cakeFace.types'
import { CAKE_FACE_ITEM_TYPE, GET_CAKE_FACE_LIST_PAYLOAD } from '@/utils/api/cakeFace'

export const getCakeFaceListRequested = createAction<void>(CakeFaceActionTypes.GET_CAKE_FACE_LIST_REQUESTED)
export const getCakeFaceListSuccess = createAction<GetCakeFaceListSuccessAction>(CakeFaceActionTypes.GET_CAKE_FACE_LIST_SUCCESSFUL)
export const getCakeFaceListFailure = createAction<string>(CakeFaceActionTypes.GET_CAKE_FACE_LIST_FAILED)
export const getCakeFaceList = createAction<GET_CAKE_FACE_LIST_PAYLOAD>(CakeFaceActionTypes.GET_CAKE_FACE_LIST)

export const getCakeFaceDetailRequested = createAction<void>(CakeFaceActionTypes.GET_CAKE_FACE_DETAIL_REQUESTED)
export const getCakeFaceDetailSuccess = createAction<CAKE_FACE_ITEM_TYPE>(CakeFaceActionTypes.GET_CAKE_FACE_DETAIL_SUCCESSFUL)
export const getCakeFaceDetailFailure = createAction<string>(CakeFaceActionTypes.GET_CAKE_FACE_DETAIL_FAILED)
export const getCakeFaceDetail = createAction<string>(CakeFaceActionTypes.GET_CAKE_FACE_DETAIL)
