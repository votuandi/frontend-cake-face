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
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
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
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    ...options,
  })
}
