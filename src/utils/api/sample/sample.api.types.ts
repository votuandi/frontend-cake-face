export type GET_SAMPLE_LIST_PAYLOAD = {
  params: {
    limit?: number
    page?: number
    name?: string
    isActive?: '0' | '1'
    sortBy?: 'name' | 'createDate'
    sort?: 'ASC' | 'DESC'
  }
}
export type GET_SAMPLE_LIST_RESPONSE = {
  total: number
  totalActive: number
  data: SAMPLE_ITEM_TYPE[]
}

export type SAMPLE_ITEM_TYPE = {
  id: number
  name: string
  detail: string
  image: string
  isActive: boolean
  createDate: Date
  createBy: string
  updateDate: Date
  updateBy: string
}

export type UPDATE_SAMPLE_DTO = {
  params: {
    name?: string
    detail?: string
    isActive?: '1' | '0'
    image?: File | undefined
  }
}

export type CREATE_SAMPLE_DTO = {
  params: {
    name: string
    detail: string
    image?: File
    isActive: '1' | '0'
  }
}

export type HTML_TO_IMAGE_DTO = {
  params: {
    content: string
  }
}
