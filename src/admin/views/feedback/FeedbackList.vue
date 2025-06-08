<template>
  <div class="p-6">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Feedback</h1>
        <p class="mt-2 text-sm text-gray-700">
          A list of all feedback received from users including their type, rating, and status.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 sm:w-auto"
        >
          Export
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-8 flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          type="text"
          placeholder="Search feedback..."
          class="block w-full rounded-md border border-brand shadow-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none outline-none sm:text-sm px-4 py-2"
        />
      </div>
      <div class="flex gap-4">
        <select
          class="block w-full rounded-md border border-brand shadow-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none outline-none sm:text-sm px-4 py-2"
        >
          <option value="">All Types</option>
          <option value="bug">Bug Reports</option>
          <option value="feature">Feature Requests</option>
          <option value="other">Other</option>
        </select>
        <select
          class="block w-full rounded-md border border-brand shadow-sm focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none outline-none sm:text-sm px-4 py-2"
        >
          <option value="">All Ratings</option>
          <option value="terrible">Terrible</option>
          <option value="bad">Bad</option>
          <option value="okay">Okay</option>
          <option value="good">Good</option>
          <option value="amazing">Amazing</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Type
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rating
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Feedback
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="fb in filteredFeedbacks" :key="fb.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                    <div class="flex items-center">
                      <div class="font-medium text-gray-900">{{ fb.type }}</div>
                      <div v-if="fb.notesCount > 0" class="ml-2 flex items-center">
                        <svg
                          class="h-4 w-4 text-gray-400"
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
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span :class="ratingClass(fb.rating)">
                      {{ fb.rating.charAt(0).toUpperCase() + fb.rating.slice(1) }}
                    </span>
                  </td>
                  <td class="px-3 py-4 text-sm text-gray-500">
                    <div class="max-w-xs truncate">{{ fb.feedback }}</div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ fb.date }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span :class="statusClass(fb.status)">
                      {{ fb.status.charAt(0).toUpperCase() + fb.status.slice(1) }}
                    </span>
                  </td>
                  <td
                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <button
                      class="text-brand hover:text-brand-dark"
                      @click="
                        $router.push({ name: 'admin-feedback-detail', params: { id: fb.id } })
                      "
                    >
                      View<span class="sr-only">, feedback</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      class="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of
            <span class="font-medium">20</span> results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

interface Feedback {
  id: number
  type: string
  rating: string
  feedback: string
  date: string
  status: string
  contact: { name: string; email: string; wantResponse: boolean } | null
  notesCount: number
}

const route = useRoute()

// Get the status and type from the URL query parameters
const currentStatus = computed(() => (route.query.status as string) || '')
const currentType = computed(() => (route.query.type as string) || '')

// Filter feedbacks based on both status and type query parameters
const filteredFeedbacks = computed(() => {
  return feedbacks.value.filter((fb) => {
    const matchesStatus = !currentStatus.value || fb.status === currentStatus.value
    const matchesType = !currentType.value || fb.type.toLowerCase().includes(currentType.value)
    const hasNotes = route.query.hasNotes === 'true' ? fb.notesCount > 0 : true
    return matchesStatus && matchesType && hasNotes
  })
})

const feedbacks = ref<Feedback[]>([
  {
    id: 1,
    type: 'Bug Report',
    rating: 'terrible',
    feedback: 'The extension keeps crashing when I try to use it with multiple tabs...',
    date: '2024-02-20',
    status: 'pending',
    contact: { name: 'John Doe', email: 'john@example.com', wantResponse: true },
    notesCount: 2,
  },
  {
    id: 2,
    type: 'Feature Request',
    rating: 'amazing',
    feedback: 'Would love to see dark mode support in the next update.',
    date: '2024-02-19',
    status: 'resolved',
    contact: { name: 'Jane Smith', email: 'jane@example.com', wantResponse: false },
    notesCount: 1,
  },
  {
    id: 3,
    type: 'General Feedback',
    rating: 'good',
    feedback: 'Great extension, but it could use more customization options.',
    date: '2024-02-18',
    status: 'closed',
    contact: null,
    notesCount: 0,
  },
  {
    id: 4,
    type: 'Bug Report',
    rating: 'okay',
    feedback: "Sometimes the extension doesn't load on startup.",
    date: '2024-02-17',
    status: 'pending',
    contact: { name: 'Alex Lee', email: 'alex@example.com', wantResponse: true },
    notesCount: 3,
  },
  {
    id: 5,
    type: 'Feature Request',
    rating: 'bad',
    feedback: 'The onboarding process is confusing for new users.',
    date: '2024-02-16',
    status: 'pending',
    contact: null,
    notesCount: 0,
  },
  {
    id: 6,
    type: 'Note',
    rating: 'none',
    feedback: 'Internal note: Need to investigate the crash reports from multiple users.',
    date: '2024-02-15',
    status: 'in-progress',
    contact: null,
    notesCount: 0,
  },
  {
    id: 7,
    type: 'Note',
    rating: 'none',
    feedback: 'Internal note: Dark mode feature planned for Q2 release.',
    date: '2024-02-14',
    status: 'resolved',
    contact: null,
    notesCount: 0,
  },
  {
    id: 8,
    type: 'Note',
    rating: 'none',
    feedback: 'Internal note: User onboarding improvements scheduled for next sprint.',
    date: '2024-02-13',
    status: 'pending',
    contact: null,
    notesCount: 0,
  },
])

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
    default:
      return ''
  }
}
</script>
