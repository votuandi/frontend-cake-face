import jsonAxios from '@/utils/axios/json.axios'
import type { AxiosResponseData } from '@/utils/axios'
import formDataAxios from '@/utils/axios/form-data.axios'
import { UPDATE_LOGO_PAYLOAD, UPDATE_SEO_CONTENT_PAYLOAD } from './setting.api.types'

const settingApi = {
  getSettings: () => {
    return jsonAxios.get<AxiosResponseData>('/settings')
  },

  updateLogo: (payload: UPDATE_LOGO_PAYLOAD) => {
    return formDataAxios.post<AxiosResponseData>('/settings/logo/', {
      ...payload.params,
    })
  },

  updateSeoContent: (payload: UPDATE_SEO_CONTENT_PAYLOAD) => {
    return jsonAxios.post<AxiosResponseData>(`/settings/seo-content/`, {
      ...payload.params,
    })
  },
}

export default settingApi
