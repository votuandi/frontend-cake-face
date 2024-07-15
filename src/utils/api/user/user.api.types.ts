import { ROLE_TYPE } from '@/utils/constants/common.constant'
import { USER_INFORMATION_TYPE } from '../auth'

export type GET_USER_LIST_PAYLOAD = {
  params: {
    limit?: number
    page?: number
    keyword?: string
    isActive?: '0' | '1'
    role?: ROLE_TYPE
  }
}

export type GET_USER_LIST_RESPONSE = {
  total: number
  totalActive: number
  data: USER_INFORMATION_TYPE[]
}

export type CREATE_ACCOUNT_PAYLOAD = {
  params: {
    userName: string
    password: string
    name: string
    address: string
    email: string
    phoneNumber: string
    note: string
    isActive: '0' | '1'
    role: ROLE_TYPE
  }
}
