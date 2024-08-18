import { SETTING_ITEM_TYPE } from "@/utils/api/setting"

export enum SettingActionTypes {
  GET_SETTINGS_REQUESTED = 'setting/getSettingsRequested',
  GET_SETTINGS_SUCCESSFUL = 'setting/getSettingsSuccessful',
  GET_SETTINGS_FAILED = 'setting/getSettingsFailed',
  GET_SETTINGS = 'setting/getSettings',
}

export interface SettingState {
  settings: SETTING_ITEM_TYPE[]
  settingsLoading: boolean
  settingsError: string | null
}

export type GetSettingsAction = { type: SettingActionTypes.GET_SETTINGS }
