<template>
  <div class="py-6">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2
            class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
          >
            Dashboard
          </h2>
        </div>
        <div class="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            class="ml-3 inline-flex items-center rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Export Report
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Total Feedback -->
        <div class="bg-white overflow-hidden rounded-lg shadow">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 rounded-md bg-brand-light p-3">
                <svg
                  class="h-6 w-6 text-brand"
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
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Feedback</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">1,234</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <svg
                        class="h-5 w-5 flex-shrink-0 self-center text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="sr-only">Increased by</span>
                      12%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Resolved Feedbacks -->
        <div class="bg-white overflow-hidden rounded-lg shadow">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 rounded-md bg-green-100 p-3">
                <svg
                  class="h-6 w-6 text-green-600"
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
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Resolved Feedbacks</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">789</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <svg
                        class="h-5 w-5 flex-shrink-0 self-center text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="sr-only">Increased by</span>
                      8%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Feedbacks -->
        <div class="bg-white overflow-hidden rounded-lg shadow">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 rounded-md bg-yellow-100 p-3">
                <svg
                  class="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Pending Feedbacks</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">23</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <svg
                        class="h-5 w-5 flex-shrink-0 self-center text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="sr-only">Increased by</span>
                      8
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Average Rating -->
        <div class="bg-white overflow-hidden rounded-lg shadow">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 rounded-md bg-purple-100 p-3">
                <svg
                  class="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">4.2</div>
                    <div class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <svg
                        class="h-5 w-5 flex-shrink-0 self-center text-green-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span class="sr-only">Increased by</span>
                      0.3
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity and Feedback Distribution -->
      <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Recent Feedback -->
        <div class="bg-white shadow rounded-lg lg:col-span-1">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">Recent Feedback</h2>
            <div class="mt-6 flow-root">
              <ul role="list" class="-my-5 divide-y divide-gray-200">
                <li v-for="feedback in recentFeedback" :key="feedback.id" class="py-4">
                  <router-link
                    :to="`/admin/feedback/${feedback.id}`"
                    class="block hover:bg-gray-50"
                  >
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <span
                          class="inline-flex h-8 w-8 items-center justify-center rounded-full"
                          :class="feedback.bgColor"
                        >
                          <span class="text-lg">{{ feedback.icon }}</span>
                        </span>
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">
                          {{ feedback.type }}
                        </p>
                        <p class="truncate text-sm text-gray-500">{{ feedback.description }}</p>
                      </div>
                      <div class="flex-shrink-0 text-sm text-gray-500">{{ feedback.time }}</div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
            <div class="mt-6">
              <router-link
                to="/admin/feedback"
                class="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-brand shadow-sm ring-1 ring-inset ring-brand hover:bg-gray-50"
              >
                View all feedback
              </router-link>
            </div>
          </div>
        </div>

        <!-- Feedback Distribution -->
        <div class="bg-white shadow rounded-lg lg:col-span-1">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">Feedback Distribution</h2>
            <div class="mt-6">
              <div class="space-y-4">
                <div v-for="type in feedbackTypes" :key="type.name" class="flex items-center">
                  <div class="flex-1">
                    <div class="flex items-center">
                      <span class="text-lg mr-2">{{ type.icon }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ type.name }}</span>
                    </div>
                    <div class="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div
                        class="h-2 rounded-full"
                        :class="type.color"
                        :style="{ width: type.percentage + '%' }"
                      ></div>
                    </div>
                  </div>
                  <div class="ml-4 text-sm font-medium text-gray-900">{{ type.percentage }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rating Distribution -->
        <div class="bg-white shadow rounded-lg lg:col-span-1">
          <div class="p-6">
            <h2 class="text-lg font-medium text-gray-900">Rating Distribution</h2>
            <div class="mt-6">
              <div class="space-y-4">
                <div
                  v-for="rating in ratingDistribution"
                  :key="rating.name"
                  class="flex items-center"
                >
                  <div class="flex-1">
                    <div class="flex items-center">
                      <span class="text-lg mr-2">{{ rating.icon }}</span>
                      <span class="text-sm font-medium text-gray-900">{{ rating.name }}</span>
                    </div>
                    <div class="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div
                        class="h-2 rounded-full"
                        :class="rating.color"
                        :style="{ width: rating.percentage + '%' }"
                      ></div>
                    </div>
                  </div>
                  <div class="ml-4 text-sm font-medium text-gray-900">{{ rating.percentage }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dummy data for recent feedback
const recentFeedback = [
  {
    id: 1,
    icon: '🐛',
    type: 'Bug Report',
    description: 'Extension crashes with multiple tabs',
    time: '2m ago',
    bgColor: 'bg-red-100',
  },
  {
    id: 2,
    icon: '✨',
    type: 'Feature Request',
    description: 'Add dark mode support',
    time: '15m ago',
    bgColor: 'bg-purple-100',
  },
  {
    id: 3,
    icon: '💭',
    type: 'General Feedback',
    description: 'Great extension, but needs more customization',
    time: '1h ago',
    bgColor: 'bg-blue-100',
  },
  {
    id: 4,
    icon: '✅',
    type: 'Resolved Feedback',
    description: 'Fixed tab management issue',
    time: '2h ago',
    bgColor: 'bg-green-100',
  },
]

// Dummy data for feedback distribution
const feedbackTypes = [
  {
    name: 'Bug Reports',
    icon: '🐛',
    percentage: 45,
    color: 'bg-red-500',
  },
  {
    name: 'Feature Requests',
    icon: '✨',
    percentage: 30,
    color: 'bg-purple-500',
  },
  {
    name: 'General Feedback',
    icon: '💭',
    percentage: 25,
    color: 'bg-blue-500',
  },
]

// Dummy data for rating distribution
const ratingDistribution = [
  {
    name: 'Amazing',
    icon: '😄',
    percentage: 35,
    color: 'bg-green-500',
  },
  {
    name: 'Good',
    icon: '🙂',
    percentage: 25,
    color: 'bg-blue-500',
  },
  {
    name: 'Okay',
    icon: '😐',
    percentage: 20,
    color: 'bg-yellow-500',
  },
  {
    name: 'Bad',
    icon: '😕',
    percentage: 15,
    color: 'bg-orange-500',
  },
  {
    name: 'Terrible',
    icon: '😫',
    percentage: 5,
    color: 'bg-red-500',
  },
]
</script>
