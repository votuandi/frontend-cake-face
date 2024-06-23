import { CATEGORY_ITEM_TYPE, GET_CATEGORY_LIST_PAYLOAD } from '@/utils/api/category'

export enum CategoryActionTypes {
  GET_CATEGORY_LIST_REQUESTED = 'category/getCategoryListRequested',
  GET_CATEGORY_LIST_SUCCESSFUL = 'category/getCategoryListSuccessful',
  GET_CATEGORY_LIST_FAILED = 'category/getCategoryListFailed',
  GET_CATEGORY_LIST = 'category/getCategoryList',
}

export interface CategoryState {
  categoryList: CATEGORY_ITEM_TYPE[]
  categoryTotalPage: number
  categoryTotalPageActive: number
  categoryListLoading: boolean
  categoryListError: string | null
}

export type GetCategoryListSuccessAction = { items: CATEGORY_ITEM_TYPE[]; total: number; totalActive: number }
export type GetCategoryListAction = { payload: GET_CATEGORY_LIST_PAYLOAD; type: CategoryActionTypes.GET_CATEGORY_LIST }
