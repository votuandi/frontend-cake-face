import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import { Role } from '@/utils/api/auth'
import { COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, COOKIE_USER_ROLE } from '@/utils/constants/cookie.constant'

const PUBLIC_PAGES = ['/', '/sign-in']

const rolePermissions: Record<Role, string[]> = {
  admin: ['/admin', ...PUBLIC_PAGES], // admin can access all pages
  client: [...PUBLIC_PAGES],
  user: [...PUBLIC_PAGES],
}

// Check if a given path is accessible based on role
const isPathAccessible = (role: Role, path: string): boolean => {
  if (role === 'admin' && path.startsWith('/admin')) {
    return true
  }

  const accessiblePaths = rolePermissions[role] || []
  return accessiblePaths.includes(path)
}

const useAuth = () => {
  const router = useRouter()
  const cookies = useMemo(() => new Cookies(), [])

  useEffect(() => {
    const accessToken = cookies.get(COOKIE_ACCESS_TOKEN)
    const refreshToken = cookies.get(COOKIE_REFRESH_TOKEN)
    const userRole = cookies.get(COOKIE_USER_ROLE)

    if (!accessToken || !refreshToken || !userRole) {
      // No tokens, user is not logged in
      if (!PUBLIC_PAGES.includes(router.pathname)) {
        if (confirm('Bạn không có quyền truy cập trang này. Vui lòng đăng nhập!')) router.push('/sign-in')
        else router.push('/')
      }
    } else {
      // Tokens exist, check expiration or permissions
      // Logic for expiration checks (not implemented here)

      const role: Role = userRole

      if (!isPathAccessible(role, router.pathname)) {
        // Redirect to home page if user tries to access unauthorized page
        alert('Bạn không có quyền truy cập trang này!')
        router.push('/')
      }
    }
  }, [router.pathname, cookies])

  return null // or return some state to indicate auth status if needed
}

export default useAuth
