import { createAction } from '@reduxjs/toolkit'
import { GetOptionListSuccessAction, OptionActionTypes } from './option.types'
import { GET_OPTION_LIST_PAYLOAD } from '@/utils/api/option'

export const getOptionListRequested = createAction<void>(OptionActionTypes.GET_OPTION_LIST_REQUESTED)
export const getOptionListSuccess = createAction<GetOptionListSuccessAction>(OptionActionTypes.GET_OPTION_LIST_SUCCESSFUL)
export const getOptionListFailure = createAction<string>(OptionActionTypes.GET_OPTION_LIST_FAILED)
export const getOptionList = createAction<GET_OPTION_LIST_PAYLOAD>(OptionActionTypes.GET_OPTION_LIST)
