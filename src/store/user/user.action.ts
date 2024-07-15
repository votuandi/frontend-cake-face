import { createAction } from '@reduxjs/toolkit'
import { GetUserListSuccessAction, UserActionTypes } from './user.types'
import { USER_INFORMATION_TYPE } from '@/utils/api/auth'
import { GET_USER_LIST_PAYLOAD } from '@/utils/api/user'

export const getCurrentUserInfoRequested = createAction<void>(UserActionTypes.GET_CURRENT_USER_INFO_REQUESTED)
export const getCurrentUserInfoSuccess = createAction<USER_INFORMATION_TYPE>(UserActionTypes.GET_CURRENT_USER_INFO_SUCCESSFUL)
export const getCurrentUserInfoFailure = createAction<string>(UserActionTypes.GET_CURRENT_USER_INFO_FAILED)
export const getCurrentUserInfo = createAction(UserActionTypes.GET_CURRENT_USER_INFO)

export const getUserListRequested = createAction<void>(UserActionTypes.GET_USER_LIST_REQUESTED)
export const getUserListSuccess = createAction<GetUserListSuccessAction>(UserActionTypes.GET_USER_LIST_SUCCESSFUL)
export const getUserListFailure = createAction<string>(UserActionTypes.GET_USER_LIST_FAILED)
export const getUserList = createAction<GET_USER_LIST_PAYLOAD>(UserActionTypes.GET_USER_LIST)
