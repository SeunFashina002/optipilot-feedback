import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { adminRoutes } from './routes'

const router = createRouter({
  history: createWebHistory('/admin'),
  routes: adminRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

// Navigation guards will be added here later
// router.beforeEach((to, from, next) => {
//   // Auth check will be implemented here
// })

export default router
