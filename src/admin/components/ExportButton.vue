<template>
  <button
    type="button"
    class="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-400 shadow-sm cursor-not-allowed"
    disabled
  >
    <svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
    {{ label }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>
