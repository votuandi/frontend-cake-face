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
    return formDataAxios.put<AxiosResponseData>(`/cake-face/${id}`, {
      ...payload.params,
    })
  },

  riseView: (id: string) => {
    return jsonAxios.put<AxiosResponseData>(`/cake-face/${id}/rise-view`)
  },

  riseDownload: (id: string) => {
    return jsonAxios.put<AxiosResponseData>(`/cake-face/${id}/rise-download`)
  },

  deleteById: (id: string) => {
    return jsonAxios.delete<AxiosResponseData>(`/cake-face/${id}`)
  },

  deleteConfigFile: (id: string, index: string) => {
    return jsonAxios.put<AxiosResponseData>(`/cake-face/${id}/config/${index}`)
  },

  addConfigFiles: (id: string, newFiles: File[]) => {
    return formDataAxios.put<AxiosResponseData>(`/cake-face/${id}/config`, {
      configFile: [...newFiles],
    })
  },
}
export default cakeFaceApi
