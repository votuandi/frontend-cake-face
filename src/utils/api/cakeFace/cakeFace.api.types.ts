import { SORT_BY_TYPE } from '@/utils/constants/common.constant'
import { CATEGORY_ITEM_TYPE } from '../category'

export type GET_CAKE_FACE_LIST_PAYLOAD = {
  params: {
    limit?: number
    page?: number
    name?: string
    categoryId?: string
    isActive?: '0' | '1'
    isTrendy?: '0' | '1'
    store?: string
    sortBy?: SORT_BY_TYPE
    sort?: 'ASC' | 'DESC'
  }
}
export type GET_CAKE_FACE_LIST_RESPONSE = {
  total: number
  totalActive: number
  data: CAKE_FACE_ITEM_TYPE[]
}

export type CAKE_FACE_ITEM_TYPE = {
  id: string
  name: string
  detail: string
  content: string
  thumbnail: string
  configFilePath: string
  isActive: boolean
  isTrendy: boolean
  store: string
  createDate: Date
  createBy: string
  updateDate: Date
  updateBy: string
  viewAmount: number
  downloadAmount: number
  category: CATEGORY_ITEM_TYPE
}

export type UPDATE_CAKE_FACE_DTO = {
  params: {
    name?: string
    detail?: string
    content?: string
    isActive?: '1' | '0'
    isTrendy?: '1' | '0'
    store?: string
    categoryId?: string
    thumbnail?: File | undefined
    configFile?: File | undefined
  }
}

export type CREATE_CAKE_FACE_DTO = {
  params: {
    name: string
    detail: string
    content: string
    thumbnail: File
    configFile: File[]
    categoryId: string
    isActive: '1' | '0'
  }
}
