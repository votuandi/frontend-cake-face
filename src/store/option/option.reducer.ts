import { createAction, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetOptionListSuccessAction, OptionState } from './option.types'
import { getOptionListFailure, getOptionListRequested, getOptionListSuccess } from './option.action'

const initialState: OptionState = {
  optionList: [],
  optionTotalPage: 1,
  optionTotalPageActive: 1,
  optionListLoading: false,
  optionListError: null,
}

const optionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOptionListRequested, (state) => {
      state.optionListLoading = true
      state.optionListError = null
    })
    .addCase(getOptionListSuccess, (state, action: PayloadAction<GetOptionListSuccessAction>) => {
      state.optionListLoading = false
      state.optionList = action.payload.items
      state.optionTotalPage = action.payload.total
      state.optionTotalPageActive = action.payload.totalActive
    })
    .addCase(getOptionListFailure, (state, action: PayloadAction<string>) => {
      state.optionListLoading = false
      state.optionListError = action.payload
    })
})

export default optionReducer
