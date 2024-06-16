import { API_HOST } from '../configs/common'
import axios from 'axios'

import { commonConfig } from '../configs'
import { commonHelpers } from '../helpers'

// const formDataAxios = axios.create({
//   baseURL: `${commonConfig.API_HOST}`,
// })

const formDataAxios = axios.create({
  baseURL: `${commonConfig.API_HOST}`,
})

formDataAxios.interceptors.request.use(
  (req) => {
    switch ((req.method as string).toUpperCase()) {
      case 'GET': {
        req.params = req.params || {}
        // Object.assign(req.params, {});
        break
      }
      case 'POST': {
        if (!(req.data instanceof FormData) && !!req.data) {
          req.data = commonHelpers.formatFormData(req.data)
        }

        break
      }
      case 'PUT': {
        if (!(req.data instanceof FormData) && !!req.data) {
          req.data = commonHelpers.formatFormData(req.data)
        }

        break
      }
    }
    return req
  },
  (err) => {
    console.log(err)
    return Promise.reject(err)
  }
)

formDataAxios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    console.log(err)
    return Promise.reject(err)
  }
)

export default formDataAxios
