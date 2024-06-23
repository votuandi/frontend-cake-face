import jsonAxios from '@/utils/axios/json.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { CREATE_CATEGORY_DTO, GET_CATEGORY_LIST_PAYLOAD, UPDATE_CATEGORY_DTO } from './category.api.types'
import { parseParams } from '@/utils/helpers/common'

const categoryApi = {
  getList: (payload: GET_CATEGORY_LIST_PAYLOAD) => {
    return jsonAxios.get<AxiosResponseData>(`/cake-face-category${Object.entries(payload.params).length > 0 ? `?${parseParams(payload.params)}` : ''}`)
  },

  getById: (id: string) => {
    return jsonAxios.get<AxiosResponseData>(`/cake-face-category/${id}`)
  },

  createCategory: (payload: CREATE_CATEGORY_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/cake-face-category/', {
      ...payload.params,
    })
  },

  updateCategory: (id: string, payload: UPDATE_CATEGORY_DTO) => {
    return formDataAxios.put<AxiosResponseData>(`/cake-face-category/${id}`, {
      ...payload.params,
    })
  },

  deleteById: (id: string) => {
    return jsonAxios.delete<AxiosResponseData>(`/cake-face-category/${id}`)
  },
}
export default categoryApi
