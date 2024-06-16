import { createAction, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { AppThunk } from "../index";
// import { RootState } from '../rootReducer'
import { IGetSchoolCategoryDetailResponse, ISchoolCategoryItem, ISchoolItem } from '@/utils/api/school'
import {
  getRecommendedSchoolListRequested,
  getRecommendedSchoolListSuccess,
  getRecommendedSchoolListFailure,
  getAdmissionSchoolListRequested,
  getAdmissionSchoolListSuccess,
  getAdmissionSchoolListFailure,
  getSchoolCategoryListRequested,
  getSchoolCategoryListSuccess,
  getSchoolCategoryListFailure,
  getSchoolCategoryDetailRequested,
  getSchoolCategoryDetailSuccess,
  getSchoolCategoryDetailFailure,
} from './school.action'
import { GetAdmissionSchoolListSuccessAction, SchoolState } from './school.types'

const initialState: SchoolState = {
  recommendedSchoolList: [],
  recommendedSchoolListLoading: false,
  recommendedSchoolListError: null,

  admissionSchoolList: [],
  admissionSchoolListLoading: false,
  admissionSchoolListError: null,
  admissionSchoolTotalPage: 0,

  schoolCategoryList: [],
  schoolCategoryListLoading: false,
  schoolCategoryListError: null,

  schoolCategoryDetail: null,
  schoolCategoryDetailLoading: false,
  schoolCategoryDetailError: null,
}

const schoolReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getRecommendedSchoolListRequested, (state) => {
      state.recommendedSchoolListLoading = true
      state.recommendedSchoolListError = null
    })
    .addCase(getRecommendedSchoolListSuccess, (state, action: PayloadAction<ISchoolItem[]>) => {
      state.recommendedSchoolListLoading = false
      state.recommendedSchoolList = action.payload
    })
    .addCase(getRecommendedSchoolListFailure, (state, action: PayloadAction<string>) => {
      state.recommendedSchoolListLoading = false
      state.recommendedSchoolListError = action.payload
    })

    .addCase(getAdmissionSchoolListRequested, (state) => {
      state.admissionSchoolListLoading = true
      state.admissionSchoolListError = null
    })
    .addCase(getAdmissionSchoolListSuccess, (state, action: PayloadAction<GetAdmissionSchoolListSuccessAction>) => {
      state.admissionSchoolListLoading = false
      state.admissionSchoolList = action.payload.items
      state.admissionSchoolTotalPage = action.payload.totalPage
    })
    .addCase(getAdmissionSchoolListFailure, (state, action: PayloadAction<string>) => {
      state.admissionSchoolListLoading = false
      state.admissionSchoolListError = action.payload
    })

    .addCase(getSchoolCategoryListRequested, (state) => {
      state.schoolCategoryListLoading = true
      state.schoolCategoryListError = null
    })
    .addCase(getSchoolCategoryListSuccess, (state, action: PayloadAction<ISchoolCategoryItem[]>) => {
      state.schoolCategoryListLoading = false
      state.schoolCategoryList = action.payload
    })
    .addCase(getSchoolCategoryListFailure, (state, action: PayloadAction<string>) => {
      state.schoolCategoryListLoading = false
      state.schoolCategoryListError = action.payload
    })

    .addCase(getSchoolCategoryDetailRequested, (state) => {
      state.schoolCategoryDetailLoading = true
      state.schoolCategoryDetailError = null
    })
    .addCase(getSchoolCategoryDetailSuccess, (state, action: PayloadAction<IGetSchoolCategoryDetailResponse | null>) => {
      state.schoolCategoryDetailLoading = false
      state.schoolCategoryDetail = action.payload
    })
    .addCase(getSchoolCategoryDetailFailure, (state, action: PayloadAction<string>) => {
      state.schoolCategoryDetailLoading = false
      state.schoolCategoryDetailError = action.payload
    })
})

export default schoolReducer
