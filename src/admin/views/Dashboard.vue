<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <div class="h-8 w-8 rounded-full bg-brand flex items-center justify-center">
                <span class="text-white font-medium text-xs">{{ adminInitials }}</span>
              </div>
              <span class="ml-2 text-sm font-medium text-gray-700">{{
                adminAuth.admin?.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- ... rest of the content ... -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAdminAuth } from '@/stores/adminAuth'

const adminAuth = useAdminAuth()

// Get admin initials
const adminInitials = computed(() => {
  if (!adminAuth.admin?.name) return ''
  return adminAuth.admin.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
})
</script>
