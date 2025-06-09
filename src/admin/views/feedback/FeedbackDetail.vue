<template>
  <div class="p-6">
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
    </div>
    <div v-else-if="feedback">
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
                  <h3 class="text-lg font-medium leading-6 text-gray-900">{{ formattedType }}</h3>
                  <p class="mt-1 text-sm text-gray-500">Submitted on {{ formattedDate }}</p>
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
                <p>{{ feedback.text }}</p>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div v-if="feedback.contactInfo" class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Contact Information</h3>
              <div class="mt-4 text-sm text-gray-500">
                <p v-if="feedback.contactInfo.name">
                  <span class="font-medium">Name:</span> {{ feedback.contactInfo.name }}
                </p>
                <p v-if="feedback.contactInfo.email" class="mt-2">
                  <span class="font-medium">Email:</span> {{ feedback.contactInfo.email }}
                </p>
                <p v-if="feedback.wantsResponse !== undefined" class="mt-2">
                  <span class="font-medium">Wants Response:</span>
                  {{ feedback.wantsResponse ? 'Yes' : 'No' }}
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
                  @change="handleStatusChange"
                  :disabled="updatingStatus"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <div v-if="statusError" class="text-red-500 text-sm mt-2">
                  {{ statusError }}
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Notes</h3>
              <div class="mt-4 space-y-4">
                <!-- Add Note Form -->
                <form @submit.prevent="handleAddNote" class="space-y-2">
                  <textarea
                    v-model="newNote"
                    rows="3"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                    placeholder="Add internal notes here..."
                    :disabled="addingNote"
                  ></textarea>
                  <div class="flex justify-end">
                    <button
                      type="submit"
                      class="inline-flex items-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50 disabled:cursor-not-allowed"
                      :disabled="addingNote || !newNote.trim()"
                    >
                      <svg
                        v-if="addingNote"
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span v-if="addingNote">Adding...</span>
                      <span v-else>Add Note</span>
                    </button>
                  </div>
                  <div v-if="addNoteError" class="text-red-500 text-xs mt-1">
                    {{ addNoteError }}
                  </div>
                </form>

                <!-- Notes List -->
                <div class="relative">
                  <div v-if="feedback.notes && feedback.notes.length > 0" class="space-y-3">
                    <div
                      v-for="(note, index) in displayedNotes"
                      :key="note.id"
                      class="border rounded p-3 bg-gray-50"
                    >
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-xs text-gray-500"
                          >{{ note.adminName }} &middot; {{ formatNoteDate(note.createdAt) }}</span
                        >
                      </div>
                      <div class="text-sm text-gray-800 whitespace-pre-line">
                        {{ note.content }}
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-gray-400 text-sm">No notes yet.</div>

                  <!-- Gradient and Show More -->
                  <div v-if="hasMoreNotes" class="relative">
                    <div
                      class="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent"
                    ></div>
                    <button
                      @click="showAllNotes = !showAllNotes"
                      class="w-full mt-2 text-sm text-brand hover:text-brand-dark font-medium"
                    >
                      {{ showAllNotes ? 'Show less' : `Show ${remainingNotesCount} more notes` }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Response (only if wantResponse is true) -->
          <div v-if="feedback.contactInfo" class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Response</h3>
              <div class="mt-4">
                <textarea
                  rows="4"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring-brand sm:text-sm"
                  v-model="responseMessage"
                  placeholder="Write your response to the user..."
                ></textarea>
                <div class="mt-4 flex justify-end">
                  <button
                    type="button"
                    class="inline-flex items-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="handleSendResponse"
                    :disabled="
                      isSendingResponse || !feedback.contactInfo?.email || !responseMessage.trim()
                    "
                  >
                    <svg
                      v-if="isSendingResponse"
                      class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span v-if="isSendingResponse">Sending...</span>
                    <span v-else>Send Response</span>
                  </button>
                </div>
                <!-- Add error and success messages -->
                <div v-if="responseError" class="mt-2 text-sm text-red-600">
                  {{ responseError }}
                </div>
                <div v-if="responseSuccess" class="mt-2 text-sm text-green-600">
                  {{ responseSuccess }}
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { firebaseService } from '@/services/firebase/firebase-service'
import { getFeedbackById, formatFeedbackType } from '@/utils/feedback'
import type { FeedbackWithId } from '@/services/firebase/types'
import { sendFeedbackResponseEmail } from '@/utils/email'
import { useAdminAuth } from '@/stores/adminAuth'

const route = useRoute()
const feedbacks = ref<FeedbackWithId[]>([])
const isLoading = ref(true)
const feedbackId = computed(() => route.params.id as string)
const feedback = computed(() => getFeedbackById(feedbacks.value, feedbackId.value))

const formattedType = computed(() =>
  feedback.value ? formatFeedbackType(feedback.value.type) : '',
)
const formattedDate = computed(() =>
  feedback.value && feedback.value.createdAt
    ? `${feedback.value.createdAt.toLocaleDateString()} ${feedback.value.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : '',
)

const updatingStatus = ref(false)
const statusError = ref('')

const responseMessage = ref('')
const isSendingResponse = ref(false)
const responseError = ref('')
const responseSuccess = ref('')

const adminAuth = useAdminAuth()

const newNote = ref('')
const addingNote = ref(false)
const addNoteError = ref('')

const sortedNotes = computed(() => {
  return (
    feedback.value?.notes?.slice().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) ||
    []
  )
})

const showAllNotes = ref(false)
const NOTES_LIMIT = 4

const displayedNotes = computed(() => {
  if (!feedback.value?.notes) return []
  const notes = sortedNotes.value
  return showAllNotes.value ? notes : notes.slice(0, NOTES_LIMIT)
})

const hasMoreNotes = computed(() => {
  return feedback.value?.notes && feedback.value.notes.length > NOTES_LIMIT
})

const remainingNotesCount = computed(() => {
  if (!feedback.value?.notes) return 0
  return feedback.value.notes.length - NOTES_LIMIT
})

function formatNoteDate(date: any) {
  if (!date) return ''
  if (typeof date === 'string') date = new Date(date)
  if (date instanceof Date) {
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    )
  }
  if (date.toDate) return date.toDate().toLocaleString()
  return ''
}

onMounted(async () => {
  isLoading.value = true
  feedbacks.value = await firebaseService.getFeedbacks()
  isLoading.value = false
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

async function handleStatusChange(event: Event) {
  if (!feedback.value) return
  const target = event.target as HTMLSelectElement | null
  if (!target) return
  const newStatus = target.value as 'pending' | 'in-progress' | 'resolved' | 'closed'
  updatingStatus.value = true
  statusError.value = ''
  try {
    await firebaseService.updateFeedbackStatus(feedback.value.id, newStatus)
    feedback.value.status = newStatus // update local
  } catch (err) {
    statusError.value = 'Failed to update status.'
  } finally {
    updatingStatus.value = false
  }
}

async function handleSendResponse() {
  if (!feedback.value || !feedback.value.contactInfo?.email || !responseMessage.value.trim()) return
  isSendingResponse.value = true
  responseError.value = ''
  responseSuccess.value = ''
  try {
    await sendFeedbackResponseEmail({
      toEmail: feedback.value.contactInfo.email,
      toName: feedback.value.contactInfo.name,
      message: responseMessage.value,
      feedbackType: formattedType.value,
      feedbackText: feedback.value.text,
    })
    responseSuccess.value = 'Response sent successfully!'
    responseMessage.value = ''
  } catch (err) {
    console.error('Send response error:', err)
    if (err instanceof Error) {
      responseError.value = err.message
    } else {
      responseError.value = 'Failed to send response. Please check the console for details.'
    }
  } finally {
    isSendingResponse.value = false
  }
}

async function handleAddNote() {
  if (!feedback.value || !newNote.value.trim()) return
  addingNote.value = true
  addNoteError.value = ''
  try {
    await firebaseService.addNote(feedback.value.id, {
      content: newNote.value.trim(),
      adminId: adminAuth.admin?.uid || 'unknown',
      adminName: adminAuth.admin?.name || 'Admin',
    })
    // Refresh feedbacks to get the new note
    feedbacks.value = await firebaseService.getFeedbacks()
    newNote.value = ''
  } catch (err) {
    addNoteError.value = 'Failed to add note.'
  } finally {
    addingNote.value = false
  }
}
</script>
