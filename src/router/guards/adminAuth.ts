import type { RouteLocationNormalized } from 'vue-router'
import { useAdminAuth } from '@/stores/adminAuth'

export async function adminAuthGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: (path?: string | { name: string }) => void,
) {
  const adminAuth = useAdminAuth()

  // Allow access to sign in page
  if (to.path === '/admin/signin') {
    // If already signed in, redirect to dashboard
    if (await adminAuth.checkAdminStatus()) {
      return next('/admin/dashboard')
    }
    return next()
  }

  // For all other admin routes, check admin status
  const isAdmin = await adminAuth.checkAdminStatus()
  if (!isAdmin) {
    // Show 404 instead of redirecting to sign in
    return next({ name: 'not-found' })
  }

  next()
}
