import {
  IGetSchoolCategoryDetailPayload,
  IGetSchoolCategoryDetailResponse,
  IGetSchoolCategoryListPayload,
  IGetSchoolListPayload,
  ISchoolCategoryItem,
  ISchoolItem,
} from '@/utils/api/school'

export enum SchoolActionTypes {
  GET_RECOMMENDED_SCHOOL_LIST_REQUESTED = 'school/getRecommendedSchoolListRequested',
  GET_RECOMMENDED_SCHOOL_LIST_SUCCESSFUL = 'school/getRecommendedSchoolListSuccessful',
  GET_RECOMMENDED_SCHOOL_LIST_FAILED = 'school/getRecommendedSchoolListFailed',
  GET_RECOMMENDED_SCHOOL_LIST = 'school/getRecommendedSchoolList',

  GET_ADMISSION_SCHOOL_LIST_REQUESTED = 'school/getAdmissionSchoolListRequested',
  GET_ADMISSION_SCHOOL_LIST_SUCCESSFUL = 'school/getAdmissionSchoolListSuccessful',
  GET_ADMISSION_SCHOOL_LIST_FAILED = 'school/getAdmissionSchoolListFailed',
  GET_ADMISSION_SCHOOL_LIST = 'school/getAdmissionSchoolList',

  GET_SCHOOL_CATEGORY_LIST_REQUESTED = 'school/getShoolCategoryListRequested',
  GET_SCHOOL_CATEGORY_LIST_SUCCESSFUL = 'school/getShoolCategoryListSuccessful',
  GET_SCHOOL_CATEGORY_LIST_FAILED = 'school/getShoolCategoryListFailed',
  GET_SCHOOL_CATEGORY_LIST = 'school/getShoolCategoryList',

  GET_SCHOOL_CATEGORY_DETAIL_REQUESTED = 'school/getShoolCategoryDetailRequested',
  GET_SCHOOL_CATEGORY_DETAIL_SUCCESSFUL = 'school/getShoolCategoryDetailSuccessful',
  GET_SCHOOL_CATEGORY_DETAIL_FAILED = 'school/getShoolCategoryDetailLFailed',
  GET_SCHOOL_CATEGORY_DETAIL = 'school/getShoolCategoryDetail',
}

export interface SchoolState {
  recommendedSchoolList: ISchoolItem[]
  recommendedSchoolListLoading: boolean
  recommendedSchoolListError: string | null

  admissionSchoolList: ISchoolItem[]
  admissionSchoolListLoading: boolean
  admissionSchoolListError: string | null
  admissionSchoolTotalPage: number

  schoolCategoryList: ISchoolCategoryItem[]
  schoolCategoryListLoading: boolean
  schoolCategoryListError: string | null

  schoolCategoryDetail: IGetSchoolCategoryDetailResponse | null
  schoolCategoryDetailLoading: boolean
  schoolCategoryDetailError: string | null
}

export type GetRecommendedSchoolListAction = { payload: IGetSchoolListPayload; type: SchoolActionTypes.GET_RECOMMENDED_SCHOOL_LIST }

export type GetAdmissionSchoolListSuccessAction = { items: ISchoolItem[]; totalPage: number }
export type GetAdmissionSchoolListAction = { payload: IGetSchoolListPayload; type: SchoolActionTypes.GET_ADMISSION_SCHOOL_LIST }

export type GetSchoolCategoryListAction = { payload: IGetSchoolCategoryListPayload; type: SchoolActionTypes.GET_SCHOOL_CATEGORY_LIST }

export type GetSchoolCategoryDetailAction = { payload: IGetSchoolCategoryDetailPayload; type: SchoolActionTypes.GET_SCHOOL_CATEGORY_DETAIL }
