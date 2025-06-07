<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div
      class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full px-6 py-8 flex flex-col items-center animate-fade-in"
    >
      <!-- Close Icon -->
      <button
        v-if="showCloseButton"
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl z-30 focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>
      <!-- Icon -->
      <div class="mb-4 z-20 flex items-center justify-center">
        <slot name="icon">
          <svg class="w-24 h-24" viewBox="0 0 96 96" fill="none">
            <!-- Circle background -->
            <circle cx="48" cy="48" r="44" class="fill-red-50" />
            <!-- Exclamation mark -->
            <path
              d="M48 24C49.1 24 50 24.9 50 26V50C50 51.1 49.1 52 48 52C46.9 52 46 51.1 46 50V26C46 24.9 46.9 24 48 24Z"
              class="fill-red-500"
            />
            <circle cx="48" cy="64" r="4" class="fill-red-500" />
          </svg>
        </slot>
      </div>
      <!-- Title -->
      <h3 class="text-2xl font-bold text-gray-900 mb-2 text-center">
        <slot name="title">{{ title }}</slot>
      </h3>
      <!-- Message -->
      <p class="text-gray-600 mb-6 text-center">
        <slot name="message">{{ message }}</slot>
      </p>
      <!-- Default Slot for Additional Content -->
      <slot />
      <!-- Actions -->
      <div class="w-full flex flex-col sm:flex-row gap-4">
        <slot name="actions">
          <button
            @click="$emit('close')"
            class="w-full py-3 px-6 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-colors duration-200 text-base tracking-tight"
          >
            {{ actionText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, default: 'Error' },
  message: { type: String, default: 'Something went wrong.' },
  actionText: { type: String, default: 'Close' },
  showCloseButton: { type: Boolean, default: true },
})

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
