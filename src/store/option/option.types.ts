import { GET_OPTION_LIST_PAYLOAD, OPTION_ITEM_TYPE } from '@/utils/api/option'

export enum OptionActionTypes {
  GET_OPTION_LIST_REQUESTED = 'option/getOptionListRequested',
  GET_OPTION_LIST_SUCCESSFUL = 'option/getOptionListSuccessful',
  GET_OPTION_LIST_FAILED = 'option/getOptionListFailed',
  GET_OPTION_LIST = 'option/getOptionList',
}

export interface OptionState {
  optionList: OPTION_ITEM_TYPE[]
  optionTotalPage: number
  optionTotalPageActive: number
  optionListLoading: boolean
  optionListError: string | null
}

export type GetOptionListSuccessAction = { items: OPTION_ITEM_TYPE[]; total: number; totalActive: number }
export type GetOptionListAction = { payload: GET_OPTION_LIST_PAYLOAD; type: OptionActionTypes.GET_OPTION_LIST }
