import { USER_INFORMATION_TYPE } from './../../utils/api/auth/auth.api.types'
import { createAction, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetUserListSuccessAction, UserState } from './user.types'
import { getCurrentUserInfoFailure, getCurrentUserInfoRequested, getCurrentUserInfoSuccess, getUserListFailure, getUserListRequested, getUserListSuccess } from './user.action'

const initialState: UserState = {
  currentUserInfo: null,
  currentUserInfoLoading: false,
  currentUserInfoError: null,

  userList: [],
  userTotalPage: 0,
  userTotalPageActive: 0,
  userListLoading: false,
  userListError: null,
}

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCurrentUserInfoRequested, (state) => {
      state.currentUserInfoLoading = true
      state.currentUserInfoError = null
    })
    .addCase(getCurrentUserInfoSuccess, (state, action: PayloadAction<USER_INFORMATION_TYPE>) => {
      state.currentUserInfoLoading = false
      state.currentUserInfo = action.payload
    })
    .addCase(getCurrentUserInfoFailure, (state, action: PayloadAction<string>) => {
      state.currentUserInfoLoading = false
      state.currentUserInfoError = action.payload
    })

    .addCase(getUserListRequested, (state) => {
      state.userListLoading = true
      state.userListError = null
    })
    .addCase(getUserListSuccess, (state, action: PayloadAction<GetUserListSuccessAction>) => {
      state.userListLoading = false
      state.userList = action.payload.items
      state.userTotalPage = action.payload.total
      state.userTotalPageActive = action.payload.totalActive
    })
    .addCase(getUserListFailure, (state, action: PayloadAction<string>) => {
      state.userListLoading = false
      state.userListError = action.payload
    })
})

export default userReducer
