import type { RouteLocationNormalized } from 'vue-router'
import { useAdminAuth } from '@/stores/adminAuth'

export async function adminAuthGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: (path?: string | { name: string }) => void,
) {
  const adminAuth = useAdminAuth()

  // Initialize auth if not already initialized
  if (!adminAuth.isInitialized) {
    await adminAuth.init()
  }

  // Skip auth check for sign in page
  if (to.path === '/admin/signin') {
    if (await adminAuth.checkAdminStatus()) {
      return next('/admin/dashboard')
    }
    return next()
  }

  // For all other admin routes, check admin status
  const isAdmin = await adminAuth.checkAdminStatus()
  if (!isAdmin) {
    // Redirect to sign in page if not authenticated
    return next('/admin/signin')
  }

  next()
}
