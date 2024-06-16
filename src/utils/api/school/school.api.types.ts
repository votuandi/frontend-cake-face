import { ILanguage } from '@/types/common'

export interface IGetSchoolListPayload {
  params: {
    language: ILanguage
    page?: number
    limit?: number
    is_recommend?: 1 | 0
    tag_id?: string
    school_category_id?: string
    admission_date?: string
  }
}

export interface IGetSchoolListResponse {
  limit: number
  page: number
  total_record: number
  School: ISchoolItem
}

export interface ISchoolItem {
  id: string
  school_category_id: string
  slug: string
  image: string
  sorting: string
  is_recommend: boolean
  enabled: boolean
  updated: string
  updated_by: string
  created: string
  created_by: string
  SchoolLanguage: ISchoolLanguage
  City: ICity
}

export interface ISchoolLanguage {
  id: string
  school_id: string
  alias: string
  name: string
  content: string
}

export interface ICity {
  id: string
  city_id: string
  alias: string
  name: string
}

export interface IGetSchoolCategoryListPayload {
  params: {
    language: ILanguage
  }
}

export type IGetSchoolCategoryListResponse = Array<ISchoolCategoryItem>

export interface ISchoolCategoryItem {
  id: string
  slug: string
  image: string
  sorting: string
  enabled: boolean
  updated: string
  updated_by: string
  created: string
  created_by: string
  SchoolCategoryLanguage: ISchoolCategoryLanguage
}

export interface ISchoolCategoryLanguage {
  id: string
  school_category_id: string
  alias: string
  name: string
  description: string
  content: string
}

export interface IGetSchoolCategoryDetailPayload {
  params: {
    language: ILanguage
    id: string
  }
}

export interface IGetSchoolCategoryDetailResponse {
  id: string
  slug: string
  image: string
  sorting: string
  enabled: boolean
  updated: string
  updated_by: string
  created: string
  created_by: string
  SchoolCategoryLanguage: ISchoolCategoryLanguage
}
