import jsonAxios from '@/utils/axios/json.axios'
import type { AxiosResponseData } from '@/utils/axios'

const userApi = {
  getCurrentUserInfo: () => {
    return jsonAxios.get<AxiosResponseData>('/user/get-info')
  },
}

export default userApi
