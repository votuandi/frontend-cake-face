import axios from 'axios'
import { commonConfig } from '../configs'
import { commonHelpers } from '../helpers'

// const commonAxios = axios.create({
//   baseURL: `${commonConfig.API_HOST}`,
// })

const commonAxios = axios.create({
  baseURL: `${commonConfig.API_HOST}`,
})

commonAxios.interceptors.request.use(
  (req) => {
    switch ((req.method as string).toUpperCase()) {
      case 'GET': {
        req.params = req.params || {}
        break
      }
      case 'POST': {
        if (!(req.data instanceof FormData) && !!req.data) {
          req.data = JSON.stringify(req.data) // Convert data to JSON
          req.headers['Content-Type'] = 'application/json' // Set Content-Type header
        }
        break
      }
      case 'PUT': {
        if (!(req.data instanceof FormData) && !!req.data) {
          req.data = JSON.stringify(req.data) // Convert data to JSON
          req.headers['Content-Type'] = 'application/json' // Set Content-Type header
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

commonAxios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    console.log(err)
    return Promise.reject(err)
  }
)

export default commonAxios
