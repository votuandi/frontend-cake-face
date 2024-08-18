export enum LOGO_TYPE {
  SMALL = 'small',
  FULL = 'full'
}

export type UPDATE_LOGO_PAYLOAD = {
  params: {
    name: LOGO_TYPE
    image: File | undefined
  }
}

export type UPDATE_SEO_CONTENT_PAYLOAD = {
  params: {
    value: string
  }
}

export type GET_SETTINGS_RESPONSE = SETTING_ITEM_TYPE[]

export type SETTING_ITEM_TYPE = {
  id: number
  name: string
  value: string,
  updateDate: Date
  updateBy: string
}