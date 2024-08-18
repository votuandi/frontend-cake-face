import axios from 'axios'
import { commonConfig } from '../configs'
import { commonHelpers } from '../helpers'
import Cookies from 'universal-cookie'
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, MAX_AGE } from '../constants/cookie.constant'
import { cleanCookie, setCookie } from '../helpers/cookie'

const cookies = new Cookies()

const formDataAxios = axios.create({
  baseURL: `${commonConfig.API_HOST}`,
})

let refreshTokenPromise: any = null

formDataAxios.interceptors.request.use(
  (req) => {
    const accessToken = cookies.get(COOKIE_ACCESS_TOKEN)
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`
    }

    switch ((req.method as string).toUpperCase()) {
      case 'GET': {
        req.params = req.params || {}
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
  async (err) => {
    console.log(err)
    const originalRequest = err.config

    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = cookies.get(COOKIE_REFRESH_TOKEN)
      if (refreshToken) {
        if (!refreshTokenPromise) {
          refreshTokenPromise = axios
            .post(`${commonConfig.API_HOST}/auth/refresh`, { refreshToken })
            .then(({ data }) => {

              // Update cookies with new tokens
              setCookie(COOKIE_ACCESS_TOKEN, data.accessToken, { maxAge: MAX_AGE })
              setCookie(COOKIE_REFRESH_TOKEN, data.refreshToken, { maxAge: MAX_AGE })

              // Update Authorization header with new access token
              formDataAxios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
              originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`

              return data.accessToken
            })
            .catch((refreshError) => {
              if (refreshError.response && refreshError.response.status === 403) {
                cleanCookie()
                alert('Phiên đăng nhập hết hạn!')
              }
              return Promise.reject(refreshError)
            })
            .finally(() => {
              refreshTokenPromise = null
            })
        }

        try {
          const newAccessToken = await refreshTokenPromise
          if (newAccessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
            return formDataAxios(originalRequest)
          }
        } catch (refreshError) {
          return Promise.reject(refreshError)
        }
      }
    }

    return Promise.reject(err)
  }
)

export default formDataAxios
