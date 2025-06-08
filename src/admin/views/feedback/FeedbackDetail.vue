<template>
  <div class="p-6">
    <div v-if="feedback">
      <!-- Header -->
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center">
            <button @click="$router.back()" class="mr-4 text-gray-400 hover:text-gray-500">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 class="text-2xl font-semibold text-gray-900">Feedback Details</h1>
          </div>
          <p class="mt-2 text-sm text-gray-700">View and manage individual feedback entry</p>
        </div>
        <div class="mt-4 flex sm:mt-0 sm:ml-4">
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            type="button"
            class="ml-3 inline-flex items-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Respond
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Main Content -->
        <div class="space-y-6">
          <!-- Type and Rating -->
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium leading-6 text-gray-900">{{ feedback.type }}</h3>
                  <p class="mt-1 text-sm text-gray-500">Submitted on {{ feedback.date }}</p>
                </div>
                <span :class="ratingClass(feedback.rating)">
                  {{ feedback.rating.charAt(0).toUpperCase() + feedback.rating.slice(1) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Feedback Text -->
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Feedback</h3>
              <div class="mt-4 text-sm text-gray-500">
                <p>{{ feedback.feedback }}</p>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div v-if="feedback.contact" class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
              <div class="mt-4 text-sm text-gray-500">
                <p v-if="feedback.contact.name">
                  <span class="font-medium">Name:</span> {{ feedback.contact.name }}
                </p>
                <p v-if="feedback.contact.email" class="mt-2">
                  <span class="font-medium">Email:</span> {{ feedback.contact.email }}
                </p>
                <p v-if="feedback.contact.wantResponse !== undefined" class="mt-2">
                  <span class="font-medium">Wants Response:</span>
                  {{ feedback.contact.wantResponse ? 'Yes' : 'No' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Status -->
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Status</h3>
              <div class="mt-4">
                <select
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                  v-model="feedback.status"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Notes</h3>
              <div class="mt-4">
                <textarea
                  rows="4"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                  placeholder="Add internal notes here..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Response (only if wantResponse is true) -->
          <div v-if="feedback.contact" class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Response</h3>
              <div class="mt-4">
                <textarea
                  rows="4"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                  placeholder="Write your response to the user..."
                ></textarea>
                <div class="mt-4 flex justify-end">
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    Send Response
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-500 text-lg">Feedback not found.</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Contact {
  name: string
  email: string
  wantResponse: boolean
}

interface Feedback {
  id: number
  type: string
  rating: string
  feedback: string
  date: string
  status: string
  contact: Contact | null
  notesCount: number
}

// Simulate the same feedbacks array as in FeedbackList.vue
const feedbacks = [
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
]

const route = useRoute()
const feedbackId = computed(() => Number(route.params.id))
const feedback = computed(() => feedbacks.find((fb) => fb.id === feedbackId.value))

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
</script>
