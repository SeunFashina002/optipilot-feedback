import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { adminRoutes } from '@/admin/router/routes'

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
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin')) {
    // TODO: Add authentication check here
    next()
  } else {
    next()
  }
})

export default router
