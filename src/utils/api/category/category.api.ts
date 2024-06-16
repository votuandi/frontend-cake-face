import commonAxios from '@/utils/axios/commom.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { CREATE_CATEGORY_DTO, UPDATE_CATEGORY_DTO } from './category.api.types'

const categoryApi = {
  getList: () => {
    return commonAxios.get<AxiosResponseData>('/categories')
  },

  getById: (id: string) => {
    return commonAxios.get<AxiosResponseData>(`/categories/${id}`)
  },

  createCategory: (payload: CREATE_CATEGORY_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/categories/', {
      ...payload.params,
    })
  },

  updateCategory: (id: string, payload: UPDATE_CATEGORY_DTO) => {
    return formDataAxios.put<AxiosResponseData>(`/categories/${id}`, {
      ...payload.params,
    })
  },

  deleteById: (id: string) => {
    return commonAxios.delete<AxiosResponseData>(`/categories/${id}`)
  },
}

export default categoryApi
