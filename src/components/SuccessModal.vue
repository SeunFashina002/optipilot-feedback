<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div
      class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full px-6 py-8 flex flex-col items-center animate-fade-in"
    >
      <!-- Confetti Canvas -->
      <canvas
        ref="confettiCanvas"
        class="pointer-events-none absolute inset-0 w-full h-full z-10"
        style="pointer-events: none"
      ></canvas>
      <!-- Close Icon for positive rating -->
      <button
        v-if="isPositiveRating"
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl z-30 focus:outline-none"
        aria-label="Close"
      >
        &times;
      </button>
      <!-- Animated Envelope Icon -->
      <div class="mb-4 z-20 flex items-center justify-center">
        <svg class="w-24 h-24" viewBox="0 0 96 96" fill="none">
          <!-- Envelope body -->
          <rect x="16" y="36" width="64" height="36" rx="6" fill="#e6faf3" />
          <!-- Envelope flap -->
          <path class="envelope-flap" d="M16 36L48 16L80 36Z" fill="#44ca92" />
          <!-- File sliding in -->
          <rect
            class="envelope-file"
            x="32"
            y="24"
            width="32"
            height="32"
            rx="4"
            fill="#fff"
            stroke="#44ca92"
            stroke-width="2"
          />
          <rect x="40" y="32" width="16" height="4" rx="2" fill="#44ca92" />
          <rect x="40" y="40" width="10" height="4" rx="2" fill="#44ca92" />
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2 text-center">
        Thank you for your feedback!
      </h3>
      <p class="text-gray-600 mb-6 text-center">
        <template v-if="isPositiveRating">
          Since you said your experience was {{ ratingLabel }}, would you mind rating us on the
          Chrome Store?
        </template>
        <template v-else>
          We appreciate your honesty and will use your feedback to improve OptiPilot.
        </template>
      </p>
      <slot />
      <div class="w-full flex flex-col sm:flex-row gap-4">
        <template v-if="isPositiveRating">
          <a
            href="https://chromewebstore.google.com/detail/optipilot/dmlphobmkbabbhpeflkgoljkojgioiai"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 py-3 px-6 bg-brand text-white font-semibold rounded-lg shadow hover:bg-brand-dark transition-colors duration-200 text-base tracking-tight text-center"
          >
            Rate on Chrome Store
          </a>
        </template>
        <template v-else>
          <button
            @click="$emit('close')"
            class="w-full py-3 px-6 bg-brand text-white font-semibold rounded-lg shadow hover:bg-brand-dark transition-colors duration-200 text-base tracking-tight"
          >
            Close
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'
const props = defineProps({
  ctaText: { type: String, default: 'Close' },
  isPositiveRating: { type: Boolean, default: false },
  ratingLabel: { type: String, default: '' },
})
const showConfetti = ref(false)
const confettiCanvas = ref(null)

onMounted(() => {
  showConfetti.value = true
  // Fire confetti burst
  if (confettiCanvas.value) {
    confetti.create(confettiCanvas.value, { resize: true, useWorker: true })({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#44ca92', '#fbbf24', '#3b82f6', '#f472b6', '#fff'],
      shapes: ['square', 'circle'],
      scalar: 1.2,
    })
  }
})
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
