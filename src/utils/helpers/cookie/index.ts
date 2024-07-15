import { COOKIE_ACCESS_TOKEN, COOKIE_AVATAR, COOKIE_REFRESH_TOKEN, COOKIE_USER_ID, COOKIE_USER_NAME, COOKIE_USER_ROLE, COOKIE_USERNAME } from '@/utils/constants/cookie.constant'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

type CookieOptions = {
  path?: string
  maxAge?: number
  expires?: Date
  secure?: boolean
  httpOnly?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
}

export const setCookie = (name: string, value: string, options?: CookieOptions) => {
  cookies.set(name, value, {
    path: '/',
    sameSite: 'strict',
    // httpOnly: process.env.NODE_ENV === 'production',
    // secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
    secure: false,
    ...options,
  })
}

export const getCookie = (name: string): string | undefined => {
  return cookies.get(name)
}

export const removeCookie = (name: string, options?: CookieOptions) => {
  cookies.remove(name, {
    path: '/',
    sameSite: 'strict',
    httpOnly: false,
    secure: false,
    ...options,
  })
}

export const cleanCookie = () => {
  cookies.remove(COOKIE_ACCESS_TOKEN, { path: '/' })
  cookies.remove(COOKIE_REFRESH_TOKEN, { path: '/' })
  cookies.remove(COOKIE_USERNAME, { path: '/' })
  cookies.remove(COOKIE_USER_NAME, { path: '/' })
  cookies.remove(COOKIE_AVATAR, { path: '/' })
  cookies.remove(COOKIE_USER_ID, { path: '/' })
  cookies.remove(COOKIE_USER_ROLE, { path: '/' })
}
