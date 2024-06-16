import {
  IGetSchoolCategoryDetailPayload,
  IGetSchoolCategoryDetailResponse,
  IGetSchoolCategoryListPayload,
  IGetSchoolListPayload,
  ISchoolCategoryItem,
  ISchoolItem,
} from '@/utils/api/school'
import { createAction } from '@reduxjs/toolkit'
import { GetAdmissionSchoolListSuccessAction, SchoolActionTypes } from './school.types'

export const getRecommendedSchoolListRequested = createAction<void>(SchoolActionTypes.GET_RECOMMENDED_SCHOOL_LIST_REQUESTED)
export const getRecommendedSchoolListSuccess = createAction<ISchoolItem[]>(SchoolActionTypes.GET_RECOMMENDED_SCHOOL_LIST_SUCCESSFUL)
export const getRecommendedSchoolListFailure = createAction<string>(SchoolActionTypes.GET_RECOMMENDED_SCHOOL_LIST_FAILED)
export const getRecommendedSchoolList = createAction<IGetSchoolListPayload>(SchoolActionTypes.GET_RECOMMENDED_SCHOOL_LIST)

export const getAdmissionSchoolListRequested = createAction<void>(SchoolActionTypes.GET_ADMISSION_SCHOOL_LIST_REQUESTED)
export const getAdmissionSchoolListSuccess = createAction<GetAdmissionSchoolListSuccessAction>(SchoolActionTypes.GET_ADMISSION_SCHOOL_LIST_SUCCESSFUL)
export const getAdmissionSchoolListFailure = createAction<string>(SchoolActionTypes.GET_ADMISSION_SCHOOL_LIST_FAILED)
export const getAdmissionSchoolList = createAction<IGetSchoolListPayload>(SchoolActionTypes.GET_ADMISSION_SCHOOL_LIST)

export const getSchoolCategoryListRequested = createAction<void>(SchoolActionTypes.GET_SCHOOL_CATEGORY_LIST_REQUESTED)
export const getSchoolCategoryListSuccess = createAction<ISchoolCategoryItem[]>(SchoolActionTypes.GET_SCHOOL_CATEGORY_LIST_SUCCESSFUL)
export const getSchoolCategoryListFailure = createAction<string>(SchoolActionTypes.GET_SCHOOL_CATEGORY_LIST_FAILED)
export const getSchoolCategoryList = createAction<IGetSchoolCategoryListPayload>(SchoolActionTypes.GET_SCHOOL_CATEGORY_LIST)

export const getSchoolCategoryDetailRequested = createAction<void>(SchoolActionTypes.GET_SCHOOL_CATEGORY_DETAIL_REQUESTED)
export const getSchoolCategoryDetailSuccess = createAction<IGetSchoolCategoryDetailResponse | null>(SchoolActionTypes.GET_SCHOOL_CATEGORY_DETAIL_SUCCESSFUL)
export const getSchoolCategoryDetailFailure = createAction<string>(SchoolActionTypes.GET_SCHOOL_CATEGORY_DETAIL_FAILED)
export const getSchoolCategoryDetail = createAction<IGetSchoolCategoryDetailPayload>(SchoolActionTypes.GET_SCHOOL_CATEGORY_DETAIL)
