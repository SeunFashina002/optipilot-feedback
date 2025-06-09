<template>
  <div class="flex flex-col h-full">
    <!-- Close button for mobile -->
    <div class="lg:hidden flex justify-end p-4">
      <button
        class="flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
        @click="emit('close')"
        aria-label="Close sidebar"
      >
        <svg class="h-6 w-6 text-gray-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Admin Info -->
    <div class="flex-shrink-0 border-b border-gray-200 p-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div class="h-10 w-10 rounded-full bg-brand flex items-center justify-center">
            <span class="text-white font-medium text-sm">{{ adminInitials }}</span>
          </div>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-700">{{ adminAuth.admin?.name }}</p>
          <p class="text-xs text-gray-500">{{ adminAuth.admin?.email }}</p>
        </div>
      </div>
    </div>

    <nav class="flex-1 px-2 py-4 space-y-1">
      <!-- Dashboard -->
      <button
        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          $route.path === '/admin'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
        @click="navigateTo('/admin')"
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
      </button>

      <!-- All Feedback -->
      <button
        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          $route.path === '/admin/feedback'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
        @click="navigateTo('/admin/feedback')"
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
          >{{ feedbackCounts.total }}</span
        >
      </button>

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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Status
          <svg
            :class="['ml-2 h-4 w-4 transition-transform', statusOpen ? 'rotate-180' : '']"
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
            <button
              @click="filterByStatus('resolved')"
              class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-green-50 hover:text-green-800"
              :class="{ 'bg-green-100 text-green-800': currentStatus === 'resolved' }"
            >
              <span class="mr-3 h-2 w-2 rounded-full bg-green-500 inline-block"></span>
              Resolved
            </button>
            <button
              @click="filterByStatus('in-progress')"
              class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-800"
              :class="{ 'bg-blue-100 text-blue-800': currentStatus === 'in-progress' }"
            >
              <span class="mr-3 h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
              In Progress
            </button>
            <button
              @click="filterByStatus('pending')"
              class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-yellow-50 hover:text-yellow-800"
              :class="{ 'bg-yellow-100 text-yellow-800': currentStatus === 'pending' }"
            >
              <span class="mr-3 h-2 w-2 rounded-full bg-yellow-500 inline-block"></span>
              Pending
            </button>
            <button
              @click="filterByStatus('closed')"
              class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              :class="{ 'bg-gray-100 text-gray-800': currentStatus === 'closed' }"
            >
              <span class="mr-3 h-2 w-2 rounded-full bg-gray-400 inline-block"></span>
              Closed
            </button>
          </div>
        </transition>
      </div>

      <!-- Bug Reports -->
      <button
        class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          currentType === 'bug'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
        @click="filterByType('bug')"
      >
        <svg
          class="mr-3 h-6 w-6"
          :class="[
            currentType === 'bug' ? 'text-brand' : 'text-gray-400 group-hover:text-gray-500',
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
        <span
          class="ml-auto inline-block py-0.5 px-3 text-xs rounded-full bg-red-100 text-red-600"
          >{{ feedbackCounts.byType.bug }}</span
        >
      </button>

      <!-- Feature Requests -->
      <button
        class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          currentType === 'feature'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
        @click="filterByType('feature')"
      >
        <svg
          class="mr-3 h-6 w-6"
          :class="[
            currentType === 'feature' ? 'text-brand' : 'text-gray-400 group-hover:text-gray-500',
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
          >{{ feedbackCounts.byType.feature }}</span
        >
      </button>

      <!-- General Feedback -->
      <button
        class="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md"
        :class="[
          currentType === 'other'
            ? 'bg-brand-light text-brand'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        ]"
        @click="filterByType('other')"
      >
        <svg
          class="mr-3 h-6 w-6"
          :class="[
            currentType === 'other' ? 'text-brand' : 'text-gray-400 group-hover:text-gray-500',
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
          >{{ feedbackCounts.byType.other }}</span
        >
      </button>

      <!-- Notes -->
      <div>
        <button
          @click="notesOpen = !notesOpen"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Notes
          <span
            class="ml-auto inline-block py-0.5 px-3 text-xs rounded-full bg-indigo-100 text-indigo-600"
            >{{ totalNotes }}</span
          >
          <svg
            :class="['ml-2 h-4 w-4 transition-transform', notesOpen ? 'rotate-180' : '']"
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
          <div v-if="notesOpen" class="ml-8 mt-1 space-y-1">
            <!-- Recent Notes -->
            <div v-for="fb in recentNotes" :key="fb.id" class="space-y-1">
              <button
                @click="viewFeedback(fb.id)"
                class="group flex items-center w-full px-2 py-1.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <div class="flex-1 min-w-0">
                  <p class="truncate text-xs text-gray-500">{{ fb.date }}</p>
                  <p class="truncate">{{ fb.feedback }}</p>
                </div>
              </button>
            </div>

            <!-- View All Notes -->
            <button
              v-if="totalNotes > recentNotes.length"
              @click="viewAllNotes"
              class="w-full px-2 py-1.5 text-xs font-medium text-brand hover:text-brand-dark text-center"
            >
              View all {{ totalNotes }} notes
            </button>
          </div>
        </transition>
      </div>
    </nav>
    <!-- Logout Button -->
    <div class="flex-shrink-0 border-t border-gray-200 p-4 mt-auto">
      <button
        type="button"
        @click="handleLogout"
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminAuth } from '@/stores/adminAuth'
import { firebaseService } from '@/services/firebase/firebase-service'
import type { FeedbackWithId } from '@/services/firebase/types'

const emit = defineEmits(['close', 'update-filters'])

const route = useRoute()
const router = useRouter()
const adminAuth = useAdminAuth()
const statusOpen = ref(false)
const notesOpen = ref(false)
const allFeedbacks = ref<FeedbackWithId[]>([])
const filteredFeedbacks = ref<FeedbackWithId[]>([])
const isLoading = ref(true)
const currentStatus = ref('')
const currentType = ref('')

// Get admin initials
const adminInitials = computed(() => {
  if (!adminAuth.admin?.name) return ''
  return adminAuth.admin.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
})

// Fetch feedbacks on component mount and when filters change
onMounted(async () => {
  await fetchFeedbacks()
})

// Watch for route changes to update feedbacks
watch(
  () => route.query,
  async () => {
    await fetchFeedbacks()
  },
  { deep: true },
)

// Function to fetch feedbacks
const fetchFeedbacks = async () => {
  try {
    isLoading.value = true
    // Always fetch all feedbacks
    allFeedbacks.value = await firebaseService.getFeedbacks()
    filteredFeedbacks.value = allFeedbacks.value
    // Emit initial data
    emit('update-filters', {
      feedbacks: allFeedbacks.value,
      type: currentType.value,
      status: currentStatus.value,
    })
  } catch (error) {
    console.error('Error loading feedbacks:', error)
  } finally {
    isLoading.value = false
  }
}

// Get feedback counts from all feedbacks
const feedbackCounts = computed(() => firebaseService.getFeedbackCounts(allFeedbacks.value))

// Show only the 3 most recent notes from filtered feedbacks
const recentNotes = computed(() => {
  return filteredFeedbacks.value
    .filter((fb) => fb.notes && fb.notes.length > 0)
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 3)
    .map((fb) => ({
      id: fb.id,
      feedback: fb.text,
      date: fb.updatedAt.toLocaleDateString(),
      notesCount: fb.notes?.length || 0,
    }))
})

// Calculate total number of notes from filtered feedbacks
const totalNotes = computed(() => {
  return filteredFeedbacks.value.reduce((sum, fb) => sum + (fb.notes?.length || 0), 0)
})

const filterByStatus = (status: string) => {
  // If clicking the same status, clear the filter
  if (currentStatus.value === status) {
    router.push('/admin/feedback')
  } else {
    router.push(`/admin/feedback?status=${status}`)
  }
  statusOpen.value = false
  emit('close')
}

const filterByType = (type: string) => {
  // If clicking the same type, clear the filter
  if (currentType.value === type) {
    router.push('/admin/feedback')
  } else {
    router.push(`/admin/feedback?type=${type}`)
  }
  emit('close')
}

// Navigation wrapper that closes sidebar
const navigateTo = async (path: string) => {
  await router.push(path)
  // Reset filters when navigating
  currentStatus.value = ''
  currentType.value = ''
  filteredFeedbacks.value = allFeedbacks.value
  // Emit reset data
  emit('update-filters', {
    feedbacks: allFeedbacks.value,
    type: '',
    status: '',
  })
  emit('close')
}

const viewFeedback = (id: string) => {
  router.push({ name: 'admin-feedback-detail', params: { id } })
  notesOpen.value = false
  emit('close')
}

const viewAllNotes = () => {
  router.push({
    name: 'admin-feedback-list',
    query: { hasNotes: 'true' },
  })
  notesOpen.value = false
  emit('close')
}

const handleLogout = async () => {
  try {
    await adminAuth.signOut()
    router.push('/admin/signin')
    emit('close')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
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
