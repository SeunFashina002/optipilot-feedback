import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'

// Lazy-loaded components
const SignIn = () => import('../views/auth/SignIn.vue')
const Dashboard = () => import('../views/dashboard/Dashboard.vue')
const FeedbackList = () => import('../views/feedback/FeedbackList.vue')
const FeedbackDetail = () => import('../views/feedback/FeedbackDetail.vue')
const NotFound = () => import('@/views/NotFound.vue')

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: Dashboard,
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
        },
      },
      {
        path: 'feedback',
        name: 'admin-feedback-list',
        component: FeedbackList,
        meta: {
          title: 'Feedback Management',
          requiresAuth: true,
        },
      },
      {
        path: 'feedback/:id',
        name: 'admin-feedback-detail',
        component: FeedbackDetail,
        meta: {
          title: 'Feedback Details',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/admin/sign-in',
    name: 'admin-sign-in',
    component: SignIn,
    meta: {
      title: 'Sign In',
      requiresAuth: false,
    },
  },
  {
    path: '/admin/:pathMatch(.*)*',
    name: 'admin-not-found',
    component: NotFound,
    meta: {
      title: 'Not Found',
      requiresAuth: false,
    },
  },
]
