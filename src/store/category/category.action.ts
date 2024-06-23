import { createAction } from '@reduxjs/toolkit'
import { CategoryActionTypes, GetCategoryListSuccessAction } from './category.types'
import { GET_CATEGORY_LIST_PAYLOAD } from '@/utils/api/category'

export const getCategoryListRequested = createAction<void>(CategoryActionTypes.GET_CATEGORY_LIST_REQUESTED)
export const getCategoryListSuccess = createAction<GetCategoryListSuccessAction>(CategoryActionTypes.GET_CATEGORY_LIST_SUCCESSFUL)
export const getCategoryListFailure = createAction<string>(CategoryActionTypes.GET_CATEGORY_LIST_FAILED)
export const getCategoryList = createAction<GET_CATEGORY_LIST_PAYLOAD>(CategoryActionTypes.GET_CATEGORY_LIST)
