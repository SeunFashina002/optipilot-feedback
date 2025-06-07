<template>
  <div class="w-full mt-8 md:mt-16 font-sans">
    <div class="bg-white rounded-none sm:rounded-xl p-4 sm:p-8 md:shadow-md">
      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
        Share Your Feedback
      </h2>
      <p class="text-gray-600 mb-6 sm:mb-8 leading-relaxed">Help us improve OptiPilot</p>

      <div class="space-y-6">
        <!-- Feedback Type Selection -->
        <div>
          <label class="block font-medium text-gray-700 mb-3"
            >What type of feedback do you have?</label
          >
          <div class="flex flex-row gap-2 sm:gap-4">
            <button
              v-for="type in feedbackTypes"
              :key="type.value"
              :class="[
                'flex-1 flex flex-col items-center p-2 sm:p-4 rounded-lg border-2 transition-colors duration-200 text-xs sm:text-sm',
                selectedType === type.value
                  ? 'border-brand bg-brand-light'
                  : 'border-gray-200 hover:border-brand',
              ]"
              @click="selectedType = type.value"
            >
              <span class="text-lg sm:text-2xl mb-1">{{ type.icon }}</span>
              <span>{{ type.label }}</span>
            </button>
          </div>
        </div>

        <!-- Experience Rating -->
        <div>
          <label class="block font-medium text-gray-700 mb-3">How was your experience?</label>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="rating in ratings"
              :key="rating.value"
              :class="[
                'flex flex-col items-center p-2 sm:p-3 rounded-lg border-2 transition-colors duration-200',
                selectedRating === rating.value
                  ? 'border-brand bg-brand-light'
                  : 'border-gray-200 hover:border-brand',
              ]"
              @click="selectedRating = rating.value"
            >
              <span class="text-xl sm:text-2xl mb-1">{{ rating.emoji }}</span>
              <span class="text-xs text-gray-600">{{ rating.label }}</span>
            </button>
          </div>
        </div>

        <!-- Feedback Input -->
        <div>
          <label class="block font-medium text-gray-700 mb-3">Your feedback</label>
          <textarea
            v-model="feedbackText"
            :placeholder="getPlaceholderText"
            class="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand resize-y font-sans transition-colors duration-200 leading-relaxed"
            rows="4"
          ></textarea>
          <div class="text-xs text-gray-500 mt-1">{{ feedbackText.length }} characters</div>
          <div
            v-if="feedbackText.length > 0 && feedbackText.length < minLength"
            class="text-xs text-red-500"
          >
            Feedback must be at least {{ minLength }} characters.
          </div>
        </div>

        <!-- Contact Preference -->
        <div>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              v-model="wantsResponse"
              class="w-5 h-5 border-2 border-gray-200 checked:border-brand focus:border-brand focus:ring-0 accent-white transition-colors duration-200"
            />
            <span class="text-gray-700">I'd like to receive a response</span>
          </label>

          <div v-if="wantsResponse" class="mt-4 space-y-3">
            <BaseInput
              v-model="userName"
              type="text"
              placeholder="Your name"
              :error="
                wantsResponse && userName.length > 0 && !isNameValid
                  ? 'Name is required.'
                  : undefined
              "
            />
            <BaseInput
              v-model="userEmail"
              type="email"
              placeholder="Your email"
              :error="
                wantsResponse && userEmail.length > 0 && !isEmailValid
                  ? 'Please enter a valid email address.'
                  : undefined
              "
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          @click="submitFeedback"
          :disabled="!isFormValid || isSubmitting"
          class="w-full py-3 sm:py-4 px-6 bg-brand text-white font-semibold rounded-lg transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-brand-dark text-base tracking-tight flex items-center justify-center gap-2"
        >
          <svg
            v-if="isSubmitting"
            class="animate-spin h-5 w-5 text-white"
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
          {{ isSubmitting ? 'Submitting...' : 'Submit Feedback' }}
        </button>
      </div>
    </div>

    <SuccessModal
      v-if="showSuccessModal"
      :show-confetti="isPositiveRating"
      :title="isPositiveRating ? 'Thank you for your feedback!' : 'Thanks for your honesty!'"
      :message="
        isPositiveRating
          ? `Since you said your experience was ${getRatingLabel}, would you mind rating us on the Chrome Store?`
          : 'We appreciate your honesty and will use your feedback to improve OptiPilot.'
      "
      :action-text="isPositiveRating ? 'Close' : 'Close'"
      @close="closeModal"
    >
      <template v-if="isPositiveRating" #actions>
        <a
          href="https://chromewebstore.google.com/detail/optipilot/dmlphobmkbabbhpeflkgoljkojgioiai"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 py-3 px-6 bg-brand text-white font-semibold rounded-lg shadow hover:bg-brand-dark transition-colors duration-200 text-base tracking-tight text-center"
        >
          Rate on Chrome Store
        </a>
      </template>
    </SuccessModal>

    <ErrorModal
      v-if="showErrorModal"
      title="Submission Failed"
      :message="errorMessage"
      action-text="Try Again"
      @close="closeErrorModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SuccessModal from './SuccessModal.vue'
import ErrorModal from './ErrorModal.vue'
import BaseInput from './BaseInput.vue'
import { firebaseService } from '@/services/firebase/firebase-service'

// Feedback Types
const feedbackTypes = [
  { value: 'bug', label: 'Bug Report', icon: '🐛' },
  { value: 'feature', label: 'Feature Request', icon: '✨' },
  { value: 'other', label: 'Other', icon: '💭' },
]

// Rating Options
const ratings = [
  { value: 'terrible', label: 'Terrible', emoji: '😫' },
  { value: 'bad', label: 'Bad', emoji: '😕' },
  { value: 'okay', label: 'Okay', emoji: '😐' },
  { value: 'good', label: 'Good', emoji: '🙂' },
  { value: 'amazing', label: 'Amazing', emoji: '😄' },
]

// Form State
const selectedType = ref('')
const selectedRating = ref('')
const feedbackText = ref('')
const wantsResponse = ref(false)
const userName = ref('')
const userEmail = ref('')
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref('')
const isSubmitting = ref(false)

// Computed Properties
const getPlaceholderText = computed(() => {
  switch (selectedType.value) {
    case 'bug':
      return 'Please describe the bug you encountered...'
    case 'feature':
      return 'Tell us about the feature you would like to see...'
    default:
      return 'Share your thoughts with us...'
  }
})

const minLength = 10
const isFeedbackValid = computed(() => feedbackText.value.trim().length >= minLength)

const isNameValid = computed(() => !wantsResponse.value || userName.value.trim().length > 0)
const isEmailValid = computed(() => {
  if (!wantsResponse.value) return true
  const email = userEmail.value.trim()
  // Simple email regex
  return /^\S+@\S+\.\S+$/.test(email)
})

const isFormValid = computed(() => {
  const hasFeedback = isFeedbackValid.value
  const hasValidContact = !wantsResponse.value || (isNameValid.value && isEmailValid.value)
  return selectedType.value && selectedRating.value && hasFeedback && hasValidContact
})

const isPositiveRating = computed(() => {
  return ['okay', 'good', 'amazing'].includes(selectedRating.value)
})

const getRatingLabel = computed(() => {
  return ratings.find((r) => r.value === selectedRating.value)?.label.toLowerCase() || ''
})

// Methods
const submitFeedback = async () => {
  isSubmitting.value = true
  try {
    await firebaseService.submitFeedback({
      type: selectedType.value as 'bug' | 'feature' | 'other',
      rating: selectedRating.value as 'terrible' | 'bad' | 'okay' | 'good' | 'amazing',
      text: feedbackText.value,
      wantsResponse: wantsResponse.value,
      contactInfo: wantsResponse.value
        ? {
            name: userName.value,
            email: userEmail.value,
          }
        : undefined,
    })
    showSuccessModal.value = true
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Failed to submit feedback'
    showErrorModal.value = true
  } finally {
    isSubmitting.value = false
  }
}

const closeModal = () => {
  showSuccessModal.value = false
  // Reset form
  selectedType.value = ''
  selectedRating.value = ''
  feedbackText.value = ''
  wantsResponse.value = false
  userName.value = ''
  userEmail.value = ''
}

const closeErrorModal = () => {
  showErrorModal.value = false
  errorMessage.value = ''
}
</script>
