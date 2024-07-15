import { USER_INFORMATION_TYPE } from '@/utils/api/auth'
import { GET_USER_LIST_PAYLOAD } from '@/utils/api/user'

export enum UserActionTypes {
  GET_CURRENT_USER_INFO_REQUESTED = 'user/getCurrentUserInfoRequested',
  GET_CURRENT_USER_INFO_SUCCESSFUL = 'user/getCurrentUserInfoSuccessful',
  GET_CURRENT_USER_INFO_FAILED = 'user/getCurrentUserInfoFailed',
  GET_CURRENT_USER_INFO = 'user/getCurrentUserInfo',

  GET_USER_LIST_REQUESTED = 'user/getUserListRequested',
  GET_USER_LIST_SUCCESSFUL = 'user/getUserListSuccessful',
  GET_USER_LIST_FAILED = 'user/getUserListFailed',
  GET_USER_LIST = 'user/getUserList',
}

export interface UserState {
  currentUserInfo: USER_INFORMATION_TYPE | null
  currentUserInfoLoading: boolean
  currentUserInfoError: string | null

  userList: USER_INFORMATION_TYPE[]
  userTotalPage: number
  userTotalPageActive: number
  userListLoading: boolean
  userListError: string | null
}

export type GetCurrentUserInfoAction = { type: UserActionTypes.GET_CURRENT_USER_INFO }

export type GetUserListSuccessAction = { items: USER_INFORMATION_TYPE[]; total: number; totalActive: number }
export type GetUserListAction = { payload: GET_USER_LIST_PAYLOAD; type: UserActionTypes.GET_USER_LIST }
