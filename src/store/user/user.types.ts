import { USER_INFORMATION_TYPE } from '@/utils/api/auth'

export enum UserActionTypes {
  GET_CURRENT_USER_INFO_REQUESTED = 'user/getCurrentUserInfoRequested',
  GET_CURRENT_USER_INFO_SUCCESSFUL = 'user/getCurrentUserInfoSuccessful',
  GET_CURRENT_USER_INFO_FAILED = 'user/getCurrentUserInfoFailed',
  GET_CURRENT_USER_INFO = 'user/getCurrentUserInfo',
}

export interface UserState {
  currentUserInfo: USER_INFORMATION_TYPE | null
  currentUserInfoLoading: boolean
  currentUserInfoError: string | null
}

export type GetCurrentUserInfoAction = { type: UserActionTypes.GET_CURRENT_USER_INFO }
