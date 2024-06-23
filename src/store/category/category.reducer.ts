import { createAction, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CategoryState, GetCategoryListSuccessAction } from './category.types'
import { getCategoryListFailure, getCategoryListRequested, getCategoryListSuccess } from './category.action'

const initialState: CategoryState = {
  categoryList: [],
  categoryTotalPage: 1,
  categoryTotalPageActive: 1,
  categoryListLoading: false,
  categoryListError: null,
}

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getCategoryListRequested, (state) => {
      state.categoryListLoading = true
      state.categoryListError = null
    })
    .addCase(getCategoryListSuccess, (state, action: PayloadAction<GetCategoryListSuccessAction>) => {
      state.categoryListLoading = false
      state.categoryList = action.payload.items
      state.categoryTotalPage = action.payload.total
      state.categoryTotalPageActive = action.payload.totalActive
    })
    .addCase(getCategoryListFailure, (state, action: PayloadAction<string>) => {
      state.categoryListLoading = false
      state.categoryListError = action.payload
    })
})

export default categoryReducer
