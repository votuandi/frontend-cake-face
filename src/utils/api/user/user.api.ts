import jsonAxios from '@/utils/axios/json.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { CREATE_ACCOUNT_PAYLOAD, GET_USER_LIST_PAYLOAD } from './user.api.types'
import { parseParams } from '@/utils/helpers/common'
import formDataAxios from '@/utils/axios/form-data.axios'

const userApi = {
  getCurrentUserInfo: () => {
    return jsonAxios.get<AxiosResponseData>('/user/get-info')
  },

  getUserList: (payload: GET_USER_LIST_PAYLOAD) => {
    return jsonAxios.get<AxiosResponseData>(`/user${Object.entries(payload.params).length > 0 ? `?${parseParams(payload.params)}` : ''}`)
  },

  create: (payload: CREATE_ACCOUNT_PAYLOAD) => {
    return formDataAxios.post<AxiosResponseData>('/user', {
      ...payload.params,
    })
  },
}

export default userApi
