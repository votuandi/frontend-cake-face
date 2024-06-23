export type GET_CATEGORY_LIST_PAYLOAD = {
  params: {
    limit?: number
    page?: number
    name?: string
    isActive?: '0' | '1'
    sortBy?: 'name' | 'createDate'
    sort?: 'ASC' | 'DESC'
  }
}
export type GET_CATEGORY_LIST_RESPONSE = {
  total: number
  totalActive: number
  data: CATEGORY_ITEM_TYPE[]
}

export type CATEGORY_ITEM_TYPE = {
  id: string
  name: string
  detail: string
  thumbnail: string
  isActive: boolean
  createDate: Date
  createBy: string
  updateDate: Date
  updateBy: string
}

export type UPDATE_CATEGORY_DTO = {
  params: {
    name?: string
    detail?: string
    isActive?: '1' | '0'
    thumbnail?: File | undefined
  }
}

export type CREATE_CATEGORY_DTO = {
  params: {
    name: string
    detail: string
    thumbnail?: File
    isActive: '1' | '0'
  }
}
