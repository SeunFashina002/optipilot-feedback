<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between items-center">
          <!-- Hamburger for mobile -->
          <button
            class="mr-3 flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand lg:hidden"
            @click="sidebarOpen = true"
            aria-label="Open sidebar"
          >
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div class="flex items-center flex-1 min-w-0">
            <h1 class="text-2xl font-bold truncate">
              <span class="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent"
                >OptiPilot</span
              >
              <span class="text-gray-600 font-medium ml-2">Admin</span>
            </h1>
          </div>
          <div class="flex items-center">
            <div class="relative">
              <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                aria-label="User menu"
              >
                <span>{{ adminInitials }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar for desktop & drawer for mobile -->
    <transition name="fade">
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 flex lg:hidden"
        aria-modal="true"
        role="dialog"
      >
        <!-- Overlay -->
        <div
          class="fixed inset-0 bg-gray-600 bg-opacity-50"
          @click="sidebarOpen = false"
          aria-label="Close sidebar overlay"
        ></div>
        <!-- Drawer -->
        <div class="relative flex w-64 flex-1 flex-col bg-white shadow-xl">
          <div class="flex-1 overflow-y-auto">
            <SidebarNav @close="sidebarOpen = false" />
          </div>
        </div>
      </div>
    </transition>

    <div class="flex h-[calc(100vh-4rem)]">
      <!-- Sidebar (desktop) -->
      <div class="hidden lg:flex w-64 bg-white shadow-sm flex-col">
        <div class="flex-1 overflow-y-auto">
          <SidebarNav />
        </div>
      </div>
      <!-- Main Content -->
      <div class="flex-1 overflow-y-auto">
        <main class="flex-1 px-2 sm:px-4 md:px-8 py-4 sm:py-6">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAdminAuth } from '@/stores/adminAuth'
import SidebarNav from '../components/SidebarNav.vue'
import { useAdminInitials } from '@/admin/composables/useAdminInitials'

const adminAuth = useAdminAuth()
const { adminInitials } = useAdminInitials()
const sidebarOpen = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
