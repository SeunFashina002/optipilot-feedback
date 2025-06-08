<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="@/assets/brand.svg" alt="OptiPilot" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Portal</h2>
      <p class="mt-2 text-center text-sm text-gray-600">Sign in to manage feedbacks</p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="py-8 px-4 sm:bg-white sm:shadow sm:rounded-lg sm:px-10">
        <!-- General error message -->
        <div v-if="generalError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p class="text-sm text-red-600">{{ generalError }}</p>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <BaseInput
            v-model="email"
            label="Email address"
            type="email"
            :error="emailError"
            autocomplete="email"
            required
            @blur="validateEmail(email)"
          />

          <div>
            <label class="block font-medium text-gray-700 mb-3">Password</label>
            <div class="relative">
              <BaseInput
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :error="passwordError"
                autocomplete="current-password"
                required
                @blur="validatePassword(password)"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                @click="togglePasswordVisibility"
              >
                <svg
                  v-if="showPassword"
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded accent-brand"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div> -->

          <div>
            <button
              type="submit"
              :disabled="!isFormValid || adminAuth.isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                v-if="adminAuth.isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              {{ adminAuth.isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/BaseInput.vue'
import { useAdminAuth } from '@/stores/adminAuth'

const router = useRouter()
const adminAuth = useAdminAuth()

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

// Error states
const emailError = ref('')
const passwordError = ref('')
const generalError = ref('')

// Computed
const isFormValid = computed(() => {
  return email.value && password.value && !emailError.value && !passwordError.value
})

// Validation methods
const validateEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!value) {
    emailError.value = 'Email is required'
    return false
  }
  if (!emailRegex.test(value)) {
    emailError.value = 'Please enter a valid email address'
    return false
  }
  emailError.value = ''
  return true
}

const validatePassword = (value: string): boolean => {
  if (!value) {
    passwordError.value = 'Password is required'
    return false
  }
  if (value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    return false
  }
  passwordError.value = ''
  return true
}

// Methods
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const resetErrors = () => {
  emailError.value = ''
  passwordError.value = ''
  generalError.value = ''
}

const handleSubmit = async () => {
  resetErrors()

  // Validate form
  const isEmailValid = validateEmail(email.value)
  const isPasswordValid = validatePassword(password.value)

  if (!isEmailValid || !isPasswordValid) {
    return
  }

  try {
    await adminAuth.signIn(email.value, password.value)
    router.push('/admin/dashboard')
  } catch (error) {
    // The error is already handled in the store
    generalError.value = adminAuth.error || 'An error occurred during sign in'
    console.error('Sign in error in component:', error)
  }
}
</script>
