import { SETTING_ITEM_TYPE } from '@/utils/api/setting'
import { createAction } from '@reduxjs/toolkit'
import { SettingActionTypes } from './setting.types'

export const getSettingsRequested = createAction<void>(SettingActionTypes.GET_SETTINGS_REQUESTED)
export const getSettingsSuccess = createAction<SETTING_ITEM_TYPE[]>(SettingActionTypes.GET_SETTINGS_SUCCESSFUL)
export const getSettingsFailure = createAction<string>(SettingActionTypes.GET_SETTINGS_FAILED)
export const getSettings = createAction(SettingActionTypes.GET_SETTINGS)
