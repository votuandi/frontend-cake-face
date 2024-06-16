import commonAxios from '@/utils/axios/commom.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { LOGIN_PAYLOAD } from './auth.api.types'

const authApi = {
  signIn: (payload: LOGIN_PAYLOAD) => {
    return commonAxios.post<AxiosResponseData>('/auth/login', {
      ...payload,
    })
  },
}

export default authApi
