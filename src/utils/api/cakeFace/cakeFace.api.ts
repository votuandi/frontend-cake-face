import jsonAxios from '@/utils/axios/json.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { parseParams } from '@/utils/helpers/common'
import { CREATE_CAKE_FACE_DTO, GET_CAKE_FACE_LIST_PAYLOAD, UPDATE_CAKE_FACE_DTO } from './cakeFace.api.types'

const cakeFaceApi = {
  getList: (payload: GET_CAKE_FACE_LIST_PAYLOAD) => {
    return jsonAxios.get<AxiosResponseData>(`/cake-face${Object.entries(payload.params).length > 0 ? `?${parseParams(payload.params)}` : ''}`)
  },

  getById: (id: string) => {
    return jsonAxios.get<AxiosResponseData>(`/cake-face/${id}`)
  },

  createCakeFace: (payload: CREATE_CAKE_FACE_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/cake-face/', {
      ...payload.params,
    })
  },

  updateCakeFace: (id: string, payload: UPDATE_CAKE_FACE_DTO) => {
    console.log('IIIIIII', id)

    return formDataAxios.put<AxiosResponseData>(`/cake-face/${id}`, {
      ...payload.params,
    })
  },

  deleteById: (id: string) => {
    return jsonAxios.delete<AxiosResponseData>(`/cake-face/${id}`)
  },
}
export default cakeFaceApi
