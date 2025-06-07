<template>
  <div>
    <Navbar />
    <main class="flex-1 w-full px-0 sm:px-6 lg:px-8 py-8">
      <div class="max-w-3xl w-full mx-auto px-0 sm:px-4">
        <FeedbackForm />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import FeedbackForm from '../components/FeedbackForm.vue'
import Navbar from '../components/Navbar.vue'
</script>
