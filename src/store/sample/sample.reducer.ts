import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { GetSampleBackgroundListSuccessAction, GetSamplePatternListSuccessAction, SampleState } from './sample.types'
import { getSampleBackgroundListFailure, getSampleBackgroundListRequested, getSampleBackgroundListSuccess, getSamplePatternListFailure, getSamplePatternListRequested, getSamplePatternListSuccess } from './sample.action'

const initialState: SampleState = {
  sampleBackgroundList: [],
  sampleBackgroundTotalPage: 0,
  sampleBackgroundTotalPageActive: 0,
  sampleBackgroundListLoading: false,
  sampleBackgroundListError: null,

  samplePatternList: [],
  samplePatternTotalPage: 0,
  samplePatternTotalPageActive: 0,
  samplePatternListLoading: false,
  samplePatternListError: null
}

const sampleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getSampleBackgroundListRequested, (state) => {
      state.sampleBackgroundListLoading = true
      state.sampleBackgroundListError = null
    })
    .addCase(getSampleBackgroundListSuccess, (state, action: PayloadAction<GetSampleBackgroundListSuccessAction>) => {
      state.sampleBackgroundListLoading = false
      state.sampleBackgroundList = action.payload.items
      state.sampleBackgroundTotalPage = action.payload.total
      state.sampleBackgroundTotalPageActive = action.payload.totalActive
    })
    .addCase(getSampleBackgroundListFailure, (state, action: PayloadAction<string>) => {
      state.sampleBackgroundListLoading = false
      state.sampleBackgroundListError = action.payload
    })

    .addCase(getSamplePatternListRequested, (state) => {
      state.samplePatternListLoading = true
      state.samplePatternListError = null
    })
    .addCase(getSamplePatternListSuccess, (state, action: PayloadAction<GetSamplePatternListSuccessAction>) => {
      state.samplePatternListLoading = false
      state.samplePatternList = action.payload.items
      state.samplePatternTotalPage = action.payload.total
      state.samplePatternTotalPageActive = action.payload.totalActive
    })
    .addCase(getSamplePatternListFailure, (state, action: PayloadAction<string>) => {
      state.samplePatternListLoading = false
      state.samplePatternListError = action.payload
    })
})

export default sampleReducer
