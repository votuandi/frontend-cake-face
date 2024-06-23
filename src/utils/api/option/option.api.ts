import jsonAxios from '@/utils/axios/json.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { parseParams } from '@/utils/helpers/common'
import { CREATE_OPTION_DTO, GET_OPTION_LIST_PAYLOAD, UPDATE_OPTION_DTO } from './option.api.types'

const optionApi = {
  getList: (payload: GET_OPTION_LIST_PAYLOAD) => {
    return jsonAxios.get<AxiosResponseData>(`/cake-face-option${Object.entries(payload.params).length > 0 ? `?${parseParams(payload.params)}` : ''}`)
  },

  getById: (id: string) => {
    return jsonAxios.get<AxiosResponseData>(`/cake-face-option/${id}`)
  },

  create: (payload: CREATE_OPTION_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/cake-face-option/', {
      ...payload.params,
    })
  },

  update: (id: string, payload: UPDATE_OPTION_DTO) => {
    return formDataAxios.put<AxiosResponseData>(`/cake-face-option/${id}`, {
      ...payload.params,
    })
  },

  deleteById: (id: string) => {
    return jsonAxios.delete<AxiosResponseData>(`/cake-face-option/${id}`)
  },
}
export default optionApi
