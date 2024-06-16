import formDataAxios from '@/utils/axios/form-data.axios'

import type { AxiosResponseData } from '@/utils/axios'
import type { IGetSchoolCategoryDetailPayload, IGetSchoolCategoryListPayload, IGetSchoolListPayload } from './school.api.types'

const schoolApi = {
  getSchoolList: (payload: IGetSchoolListPayload) => {
    return formDataAxios.post<AxiosResponseData>('/api/school/schools/list.json', {
      ...payload.params,
    })
  },

  getSchoolCategoryList: (payload: IGetSchoolCategoryListPayload) => {
    return formDataAxios.post<AxiosResponseData>('/api/school/school_categories/list.json', {
      ...payload.params,
    })
  },

  getSchoolCategoryDetail: (payload: IGetSchoolCategoryDetailPayload) => {
    return formDataAxios.post<AxiosResponseData>('/api/school/school_categories/detail.json', {
      ...payload.params,
    })
  },
}

export default schoolApi
