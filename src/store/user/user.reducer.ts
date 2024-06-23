import { USER_INFORMATION_TYPE } from './../../utils/api/auth/auth.api.types'
import { createAction, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './user.types'
import { getCurrentUserInfoFailure, getCurrentUserInfoRequested, getCurrentUserInfoSuccess } from './user.action'

const initialState: UserState = {
  currentUserInfo: null,
  currentUserInfoLoading: false,
  currentUserInfoError: null,
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
})

export default userReducer
