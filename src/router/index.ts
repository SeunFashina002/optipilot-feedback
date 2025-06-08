import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { adminRoutes } from '@/admin/router/routes'
import { adminAuthGuard } from './guards/adminAuth'

const routes: RouteRecordRaw[] = [
  ...adminRoutes,
  // Main app routes
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Add navigation guard to protect admin routes
router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/admin')) {
    await adminAuthGuard(to, from, next)
  } else {
    next()
  }
})

export default router
