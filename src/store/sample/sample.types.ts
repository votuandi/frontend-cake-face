import { GET_SAMPLE_LIST_PAYLOAD, SAMPLE_ITEM_TYPE } from "@/utils/api/sample"

export enum SampleActionTypes {
  GET_SAMPLE_BACKGROUND_LIST_REQUESTED = 'sample/getSampleBackgroundListRequested',
  GET_SAMPLE_BACKGROUND_LIST_SUCCESSFUL = 'sample/getSampleBackgroundListSuccessful',
  GET_SAMPLE_BACKGROUND_LIST_FAILED = 'sample/getSampleBackgroundListFailed',
  GET_SAMPLE_BACKGROUND_LIST = 'sample/getSampleBackgroundList',
  
  GET_SAMPLE_PATTERN_LIST_REQUESTED = 'sample/getSamplePatternListRequested',
  GET_SAMPLE_PATTERN_LIST_SUCCESSFUL = 'sample/getSamplePatternListSuccessful',
  GET_SAMPLE_PATTERN_LIST_FAILED = 'sample/getSamplePatternListFailed',
  GET_SAMPLE_PATTERN_LIST = 'sample/getSamplePatternList',
}

export interface SampleState {
  sampleBackgroundList: SAMPLE_ITEM_TYPE[]
  sampleBackgroundTotalPage: number
  sampleBackgroundTotalPageActive: number
  sampleBackgroundListLoading: boolean
  sampleBackgroundListError: string | null
  
  samplePatternList: SAMPLE_ITEM_TYPE[]
  samplePatternTotalPage: number
  samplePatternTotalPageActive: number
  samplePatternListLoading: boolean
  samplePatternListError: string | null
}

export type GetSampleBackgroundListSuccessAction = { items: SAMPLE_ITEM_TYPE[]; total: number; totalActive: number }
export type GetSampleBackgroundListAction = { payload: GET_SAMPLE_LIST_PAYLOAD; type: SampleActionTypes.GET_SAMPLE_BACKGROUND_LIST }

export type GetSamplePatternListSuccessAction = { items: SAMPLE_ITEM_TYPE[]; total: number; totalActive: number }
export type GetSamplePatternListAction = { payload: GET_SAMPLE_LIST_PAYLOAD; type: SampleActionTypes.GET_SAMPLE_PATTERN_LIST }
