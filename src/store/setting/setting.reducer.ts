import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import { SettingState } from './setting.types'
import { SETTING_ITEM_TYPE } from '@/utils/api/setting'
import { getSettingsFailure, getSettingsRequested, getSettingsSuccess } from './setting.action'

const initialState: SettingState = {
  settings: [],
  settingsLoading: false,
  settingsError: null,
}

const settingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getSettingsRequested, (state) => {
      state.settingsLoading = true
      state.settingsError = null
    })
    .addCase(getSettingsSuccess, (state, action: PayloadAction<SETTING_ITEM_TYPE[]>) => {
      state.settingsLoading = false
      state.settings = action.payload
    })
    .addCase(getSettingsFailure, (state, action: PayloadAction<string>) => {
      state.settingsLoading = false
      state.settingsError = action.payload
    })
})

export default settingReducer
