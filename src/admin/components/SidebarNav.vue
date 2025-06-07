<template>
  <div class="flex flex-col h-full">
    <nav class="flex-1 px-2 py-4 space-y-1">
      <!-- Dashboard -->
      <router-link
        to="/admin"
        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          $route.path === '/admin'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
      >
        <svg
          class="mr-3 h-6 w-6"
          :class="[
            $route.path === '/admin' ? 'text-brand' : 'text-gray-400 group-hover:text-gray-500',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Dashboard
      </router-link>

      <!-- All Feedback -->
      <router-link
        to="/admin/feedback"
        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          $route.path === '/admin/feedback'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
      >
        <svg
          class="mr-3 h-6 w-6"
          :class="[
            $route.path === '/admin/feedback'
              ? 'text-brand'
              : 'text-gray-400 group-hover:text-gray-500',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        All Feedback
        <span
          class="ml-auto inline-block py-0.5 px-3 text-xs rounded-full bg-gray-100 text-gray-600"
          >1,234</span
        >
      </router-link>

      <!-- Status Dropdown -->
      <div>
        <button
          @click="statusOpen = !statusOpen"
          class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 focus:outline-none"
        >
          <svg
            class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Status
          <svg
            :class="['ml-auto h-4 w-4 transition-transform', statusOpen ? 'rotate-180' : '']"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <transition name="fade">
          <div v-if="statusOpen" class="ml-8 mt-1 space-y-1">
            <router-link
              to="/admin/feedback/status/resolved"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-green-50 hover:text-green-800"
              active-class="bg-green-100 text-green-800"
            >
              <span class="mr-3 h-2 w-2 rounded-full bg-green-500 inline-block"></span>
              Resolved
            </router-link>
            <router-link
              to="/admin/feedback/status/in-progress"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-800"
              active-class="bg-blue-100 text-blue-800"
            >
              <span class="mr-3 h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
              In Progress
            </router-link>
            <router-link
              to="/admin/feedback/status/pending"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-yellow-50 hover:text-yellow-800"
              active-class="bg-yellow-100 text-yellow-800"
            >
              <span class="mr-3 h-2 w-2 rounded-full bg-yellow-500 inline-block"></span>
              Pending
            </router-link>
            <router-link
              to="/admin/feedback/status/closed"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              active-class="bg-gray-100 text-gray-800"
            >
              <span class="mr-3 h-2 w-2 rounded-full bg-gray-400 inline-block"></span>
              Closed
            </router-link>
          </div>
        </transition>
      </div>

      <!-- Bug Reports -->
      <router-link
        to="/admin/feedback/bugs"
        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          $route.path === '/admin/feedback/bugs'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
      >
        <svg
          class="mr-3 h-6 w-6"
          :class="[
            $route.path === '/admin/feedback/bugs'
              ? 'text-brand'
              : 'text-gray-400 group-hover:text-gray-500',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        Bug Reports
        <span class="ml-auto inline-block py-0.5 px-3 text-xs rounded-full bg-red-100 text-red-600"
          >45</span
        >
      </router-link>

      <!-- Feature Requests -->
      <router-link
        to="/admin/feedback/features"
        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          $route.path === '/admin/feedback/features'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
      >
        <svg
          class="mr-3 h-6 w-6"
          :class="[
            $route.path === '/admin/feedback/features'
              ? 'text-brand'
              : 'text-gray-400 group-hover:text-gray-500',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Feature Requests
        <span
          class="ml-auto inline-block py-0.5 px-3 text-xs rounded-full bg-purple-100 text-purple-600"
          >30</span
        >
      </router-link>

      <!-- General Feedback -->
      <router-link
        to="/admin/feedback/general"
        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          $route.path === '/admin/feedback/general'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
      >
        <svg
          class="mr-3 h-6 w-6"
          :class="[
            $route.path === '/admin/feedback/general'
              ? 'text-brand'
              : 'text-gray-400 group-hover:text-gray-500',
          ]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        General Feedback
        <span
          class="ml-auto inline-block py-0.5 px-3 text-xs rounded-full bg-blue-100 text-blue-600"
          >25</span
        >
      </router-link>
    </nav>
    <!-- Logout Button -->
    <div class="flex-shrink-0 border-t border-gray-200 p-4 mt-auto">
      <button
        type="button"
        class="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
      >
        <svg
          class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const statusOpen = ref(false)
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
