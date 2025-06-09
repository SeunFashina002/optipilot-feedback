<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Header and Actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="mb-4 sm:mb-0">
        <h1 class="text-2xl font-bold text-gray-900">Feedback</h1>
        <p class="text-gray-600 text-sm mt-1">
          A list of all feedback received from users including their type, rating, and status.
        </p>
      </div>
      <ExportButton label="Export" />
    </div>

    <!-- Search and Filters -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search feedback..."
        class="w-full sm:w-1/3 rounded-md border-0 py-2 pl-4 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none sm:text-sm sm:leading-6 transition-shadow"
      />
      <div class="flex flex-row gap-2 mt-2 sm:mt-0">
        <select
          v-model="statusFilter"
          class="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none sm:text-sm sm:leading-6 transition-shadow"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select
          v-model="typeFilter"
          class="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none sm:text-sm sm:leading-6 transition-shadow"
        >
          <option value="">All Types</option>
          <option value="bug">Bug Reports</option>
          <option value="feature">Feature Requests</option>
          <option value="other">General Feedback</option>
        </select>
        <select
          v-model="ratingFilter"
          class="rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-brand focus:border-brand focus:outline-none sm:text-sm sm:leading-6 transition-shadow"
        >
          <option value="">All Ratings</option>
          <option value="amazing">Amazing</option>
          <option value="good">Good</option>
          <option value="okay">Okay</option>
          <option value="bad">Bad</option>
          <option value="terrible">Terrible</option>
        </select>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="paginatedFeedbacks.length === 0" class="text-center py-12">
      <p class="text-gray-500">No feedbacks match your filters.</p>
    </div>

    <!-- Feedback list -->
    <div v-else class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Type
                  </th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rating</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Feedback
                  </th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr
                  v-for="feedback in paginatedFeedbacks"
                  :key="feedback.id"
                  class="hover:bg-gray-50 cursor-pointer"
                  @click="goToDetail(feedback.id)"
                >
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    {{ formatFeedbackType(feedback.type) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span :class="ratingClass(feedback.rating)">
                      {{ feedback.rating.charAt(0).toUpperCase() + feedback.rating.slice(1) }}
                    </span>
                  </td>
                  <td class="px-3 py-4 text-sm text-gray-500">
                    <div class="max-w-xs truncate">{{ feedback.text }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ feedback.createdAt.toLocaleDateString() }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm">
                    <span :class="statusClass(feedback.status)">
                      {{
                        feedback.status.charAt(0).toUpperCase() +
                        feedback.status.slice(1).replace('-', ' ')
                      }}
                    </span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-center">
                    <span
                      v-if="feedback.notes && feedback.notes.length > 0"
                      class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                    >
                      {{ feedback.notes.length }}
                    </span>
                    <span v-else class="text-gray-400">0</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Pagination -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
        <div class="text-sm text-gray-600 mb-2 sm:mb-0">
          Showing {{ firstItem }} to {{ lastItem }} of {{ filteredFeedbacks.length }} results
        </div>
        <div>
          <nav
            class="inline-flex rounded-md shadow-sm border border-gray-300 bg-white"
            aria-label="Pagination"
          >
            <button
              :disabled="currentPage === 1"
              @click="currentPage--"
              class="relative inline-flex items-center px-3 py-2 rounded-l-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              :disabled="currentPage === totalPages"
              @click="currentPage++"
              class="relative inline-flex items-center px-3 py-2 rounded-r-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 focus:outline-none"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { firebaseService } from '@/services/firebase/firebase-service'
import type { FeedbackWithId } from '@/services/firebase/types'
import { formatFeedbackType } from '@/utils/feedback'
import { formatDistanceToNow } from 'date-fns'
import { useAdminAuth } from '@/stores/adminAuth'
import ExportButton from '@/admin/components/ExportButton.vue'

const route = useRoute()
const router = useRouter()
const feedbacks = ref<FeedbackWithId[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')
const typeFilter = ref('')
const ratingFilter = ref('')
const statusFilter = ref('')

// Pagination
const currentPage = ref(1)
const pageSize = 10
const totalPages = computed(() => Math.ceil(filteredFeedbacks.value.length / pageSize))
const paginatedFeedbacks = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredFeedbacks.value.slice(start, start + pageSize)
})

const firstItem = computed(() =>
  filteredFeedbacks.value.length === 0 ? 0 : (currentPage.value - 1) * pageSize + 1,
)
const lastItem = computed(() =>
  Math.min(currentPage.value * pageSize, filteredFeedbacks.value.length),
)

// Fetch feedbacks on mount and when route changes
onMounted(async () => {
  await fetchFeedbacks()
  // Sync filters with URL params
  if (route.query.status) statusFilter.value = route.query.status as string
  if (route.query.type) typeFilter.value = route.query.type as string
  if (route.query.rating) ratingFilter.value = route.query.rating as string
})

// Watch for route changes to update filters
watch(
  () => route.query,
  (newQuery) => {
    statusFilter.value = (newQuery.status as string) || ''
    typeFilter.value = (newQuery.type as string) || ''
    ratingFilter.value = (newQuery.rating as string) || ''
  },
  { immediate: true },
)

const fetchFeedbacks = async () => {
  try {
    isLoading.value = true
    error.value = null
    // Always fetch all feedbacks
    feedbacks.value = await firebaseService.getFeedbacks()
  } catch (err) {
    console.error('Error fetching feedbacks:', err)
    error.value = 'Failed to load feedbacks'
  } finally {
    isLoading.value = false
  }
}

const filteredFeedbacks = computed(() => {
  // Always start with the full list
  let filtered = [...feedbacks.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (fb) =>
        fb.text.toLowerCase().includes(query) ||
        fb.type.toLowerCase().includes(query) ||
        fb.rating.toLowerCase().includes(query) ||
        fb.contactInfo?.name?.toLowerCase().includes(query) ||
        fb.contactInfo?.email?.toLowerCase().includes(query),
    )
  }

  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter((fb) => fb.status === statusFilter.value)
  }

  // Apply type filter
  if (typeFilter.value) {
    filtered = filtered.filter((fb) => fb.type === typeFilter.value)
  }

  // Apply rating filter
  if (ratingFilter.value) {
    filtered = filtered.filter((fb) => fb.rating === ratingFilter.value)
  }

  // Apply hasNotes filter
  if (route.query.hasNotes === 'true') {
    filtered = filtered.filter((fb) => fb.notes && fb.notes.length > 0)
  }

  return filtered
})

function ratingClass(rating: string) {
  switch (rating) {
    case 'terrible':
      return 'inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800'
    case 'bad':
      return 'inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800'
    case 'okay':
      return 'inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800'
    case 'good':
      return 'inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800'
    case 'amazing':
      return 'inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'
    case 'none':
      return 'inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800'
    default:
      return ''
  }
}

function statusClass(status: string) {
  switch (status) {
    case 'pending':
      return 'inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800'
    case 'resolved':
      return 'inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'
    case 'closed':
      return 'inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800'
    case 'in-progress':
      return 'inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800'
    default:
      return ''
  }
}

function goToDetail(id: string) {
  router.push({ name: 'admin-feedback-detail', params: { id } })
}
</script>
