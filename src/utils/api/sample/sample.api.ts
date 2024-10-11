import jsonAxios from '@/utils/axios/json.axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { parseParams } from '@/utils/helpers/common'
import { CREATE_SAMPLE_DTO, GET_SAMPLE_LIST_PAYLOAD, HTML_TO_IMAGE_DTO, UPDATE_SAMPLE_DTO } from './sample.api.types'

const sampleApi = {
  getSampleBackgroundList: (payload: GET_SAMPLE_LIST_PAYLOAD) => {
    return jsonAxios.get<AxiosResponseData>(`/sample-background${Object.entries(payload.params).length > 0 ? `?${parseParams(payload.params)}` : ''}`)
  },

  getSampleBackgroundById: (id: string) => {
    return jsonAxios.get<AxiosResponseData>(`/sample-background/${id}`)
  },

  createSampleBackground: (payload: CREATE_SAMPLE_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/sample-background/', {
      ...payload.params,
    })
  },

  updateSampleBackground: (id: string, payload: UPDATE_SAMPLE_DTO) => {
    return formDataAxios.put<AxiosResponseData>(`/sample-background/${id}`, {
      ...payload.params,
    })
  },

  deleteSampleBackgroundById: (id: string) => {
    return jsonAxios.delete<AxiosResponseData>(`/sample-background/${id}`)
  },

  getSamplePatternList: (payload: GET_SAMPLE_LIST_PAYLOAD) => {
    return jsonAxios.get<AxiosResponseData>(`/sample-pattern${Object.entries(payload.params).length > 0 ? `?${parseParams(payload.params)}` : ''}`)
  },

  getSamplePatternById: (id: string) => {
    return jsonAxios.get<AxiosResponseData>(`/sample-pattern/${id}`)
  },

  createSamplePattern: (payload: CREATE_SAMPLE_DTO) => {
    return formDataAxios.post<AxiosResponseData>('/sample-pattern/', {
      ...payload.params,
    })
  },

  updateSamplePattern: (id: string, payload: UPDATE_SAMPLE_DTO) => {
    return formDataAxios.put<AxiosResponseData>(`/sample-pattern/${id}`, {
      ...payload.params,
    })
  },

  deleteSamplePatternById: (id: string) => {
    return jsonAxios.delete<AxiosResponseData>(`/sample-pattern/${id}`)
  },

  htmlToImage: (payload: HTML_TO_IMAGE_DTO) => {
    return jsonAxios.post<AxiosResponseData>('/sample-pattern/download-sample/', {
      ...payload.params,
    })
  },
}
export default sampleApi
