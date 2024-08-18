import { createAction } from '@reduxjs/toolkit'
import { GetSampleBackgroundListSuccessAction, GetSamplePatternListSuccessAction, SampleActionTypes } from './sample.types'
import { GET_SAMPLE_LIST_PAYLOAD } from '@/utils/api/sample'

export const getSampleBackgroundListRequested = createAction<void>(SampleActionTypes.GET_SAMPLE_BACKGROUND_LIST_REQUESTED)
export const getSampleBackgroundListSuccess = createAction<GetSampleBackgroundListSuccessAction>(SampleActionTypes.GET_SAMPLE_BACKGROUND_LIST_SUCCESSFUL)
export const getSampleBackgroundListFailure = createAction<string>(SampleActionTypes.GET_SAMPLE_BACKGROUND_LIST_FAILED)
export const getSampleBackgroundList = createAction<GET_SAMPLE_LIST_PAYLOAD>(SampleActionTypes.GET_SAMPLE_BACKGROUND_LIST)

export const getSamplePatternListRequested = createAction<void>(SampleActionTypes.GET_SAMPLE_PATTERN_LIST_REQUESTED)
export const getSamplePatternListSuccess = createAction<GetSamplePatternListSuccessAction>(SampleActionTypes.GET_SAMPLE_PATTERN_LIST_SUCCESSFUL)
export const getSamplePatternListFailure = createAction<string>(SampleActionTypes.GET_SAMPLE_PATTERN_LIST_FAILED)
export const getSamplePatternList = createAction<GET_SAMPLE_LIST_PAYLOAD>(SampleActionTypes.GET_SAMPLE_PATTERN_LIST)
