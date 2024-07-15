import { ROLE_TYPE } from '@/utils/constants/common.constant'
import { USER_INFORMATION_TYPE } from '../auth'

export type UPDATE_BANNER_PAYLOAD = {
  params: {
    action: 'up' | 'down'
  }
}

export type BANNER_ITEM = {
  id: number
  path: string
  index: number
  createTime: string
}
