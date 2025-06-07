<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div
      class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full px-6 py-8 flex flex-col items-center animate-fade-in"
    >
      <!-- Confetti Canvas -->
      <canvas
        v-if="showConfetti"
        ref="confettiCanvas"
        class="pointer-events-none absolute inset-0 w-full h-full z-10"
        style="pointer-events: none"
      ></canvas>
      <!-- Close Icon -->
      <button
        v-if="showCloseButton"
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl z-30 focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>
      <!-- Icon Slot -->
      <div class="mb-4 z-20 flex items-center justify-center">
        <slot name="icon">
          <svg class="w-24 h-24" viewBox="0 0 96 96" fill="none">
            <!-- Envelope body -->
            <rect x="16" y="36" width="64" height="36" rx="6" class="fill-brand-light" />
            <!-- Envelope flap -->
            <path class="envelope-flap fill-brand" d="M16 36L48 16L80 36Z" />
            <!-- File sliding in -->
            <rect
              class="envelope-file fill-white stroke-brand"
              x="32"
              y="24"
              width="32"
              height="32"
              rx="4"
              stroke-width="2"
            />
            <rect x="40" y="32" width="16" height="4" rx="2" class="fill-brand" />
            <rect x="40" y="40" width="10" height="4" rx="2" class="fill-brand" />
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
            class="w-full py-3 px-6 bg-brand text-white font-semibold rounded-lg shadow hover:bg-brand-dark transition-colors duration-200 text-base tracking-tight"
          >
            {{ actionText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps({
  title: { type: String, default: 'Success!' },
  message: { type: String, default: 'Operation completed successfully.' },
  actionText: { type: String, default: 'Close' },
  showConfetti: { type: Boolean, default: false },
  showCloseButton: { type: Boolean, default: true },
})

const confettiCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (props.showConfetti && confettiCanvas.value) {
    confetti.create(confettiCanvas.value, { resize: true, useWorker: true })({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['var(--color-brand)', '#fbbf24', '#3b82f6', '#f472b6', '#fff'],
      shapes: ['square', 'circle'],
      scalar: 1.2,
    })
  }
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
@keyframes envelope-file-in {
  0% {
    transform: translateY(-32px);
    opacity: 0;
  }
  60% {
    transform: translateY(8px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.envelope-file {
  animation: envelope-file-in 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes envelope-flap-open {
  0% {
    transform: rotateX(0deg);
  }
  60% {
    transform: rotateX(-60deg);
  }
  100% {
    transform: rotateX(-75deg);
  }
}
.envelope-flap {
  transform-origin: 48px 36px;
  animation: envelope-flap-open 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
