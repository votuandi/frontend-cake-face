export type GET_CATEGORY_LIST_PAYLOAD = {
  params: {}
}
export type GET_CATEGORY_LIST_RESPONSE = CATEGORY_ITEM_TYPE[]

export type CATEGORY_ITEM_TYPE = {
  id: string
  name: string
  thumbnail: string
  active: boolean
  create_time: Date
}

export type UPDATE_CATEGORY_DTO = {
  params: {
    name: string
    active: '1' | '0'
    thumbnail: File | undefined
  }
}

export type CREATE_CATEGORY_DTO = {
  params: {
    name: string
    thumbnail: File
    active: '1' | '0'
  }
}
