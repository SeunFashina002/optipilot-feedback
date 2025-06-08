import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAdminAuth } from './stores/adminAuth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize admin auth
const adminAuth = useAdminAuth()
;(async () => {
  await adminAuth.init()
  app.mount('#app')
})()
