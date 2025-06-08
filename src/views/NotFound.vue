<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="@/assets/brand.svg" alt="OptiPilot" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">404</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-lg font-medium text-gray-900">Page Not Found</h3>
        <p class="mt-2 text-sm text-gray-500">
          The page you're looking for might have been moved, deleted, or never existed.
        </p>
        <div class="mt-6">
          <button
            @click="goToFeedback"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
            <svg class="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go to Feedback
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToFeedback = () => {
  router.push('/feedback')
}
</script>
