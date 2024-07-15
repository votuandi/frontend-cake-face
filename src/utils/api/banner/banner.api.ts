import jsonAxios from '@/utils/axios/json.axios'
import type { AxiosResponseData } from '@/utils/axios'
import { parseParams } from '@/utils/helpers/common'
import formDataAxios from '@/utils/axios/form-data.axios'

const bannerApi = {
  getBanners: () => {
    return jsonAxios.get<AxiosResponseData>('/banners')
  },

  addBanner: (image: File) => {
    return formDataAxios.post<AxiosResponseData>('/banners', {
      image,
    })
  },

  update: (id: string, action: 'up' | 'down') => {
    return jsonAxios.put<AxiosResponseData>(`/banners/${id}`, {
      action,
    })
  },

  deleteBanner: (id: string) => {
    return jsonAxios.delete<AxiosResponseData>(`/banners/${id}`)
  },
}

export default bannerApi
