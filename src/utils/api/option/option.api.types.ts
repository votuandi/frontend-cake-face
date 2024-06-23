export type GET_OPTION_LIST_PAYLOAD = {
  params: {
    limit?: number
    page?: number
    name?: string
    cakeFaceId?: string
    isActive?: '0' | '1'
    sortBy?: 'name' | 'createDate'
    sort?: 'ASC' | 'DESC'
  }
}
export type GET_OPTION_LIST_RESPONSE = {
  total: number
  totalActive: number
  data: OPTION_ITEM_TYPE[]
}

export type OPTION_ITEM_TYPE = {
  id: string
  name: string
  detail: string
  image: string
  isActive: boolean
  createDate: Date
  createBy: string
  updateDate: Date
  updateBy: string
}

export type UPDATE_OPTION_DTO = {
  params: {
    name?: string
    detail?: string
    isActive?: '1' | '0'
    image?: File | undefined
  }
}

export type CREATE_OPTION_DTO = {
  params: {
    name: string
    detail: string
    image?: File
    isActive: '1' | '0'
  }
}
