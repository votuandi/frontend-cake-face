import { createAction } from '@reduxjs/toolkit'
import { UserActionTypes } from './user.types'
import { USER_INFORMATION_TYPE } from '@/utils/api/auth'

export const getCurrentUserInfoRequested = createAction<void>(UserActionTypes.GET_CURRENT_USER_INFO_REQUESTED)
export const getCurrentUserInfoSuccess = createAction<USER_INFORMATION_TYPE>(UserActionTypes.GET_CURRENT_USER_INFO_SUCCESSFUL)
export const getCurrentUserInfoFailure = createAction<string>(UserActionTypes.GET_CURRENT_USER_INFO_FAILED)
export const getCurrentUserInfo = createAction(UserActionTypes.GET_CURRENT_USER_INFO)
