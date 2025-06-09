<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div
      class="hidden lg:flex lg:flex-shrink-0"
      :class="{ 'lg:w-64': !isSidebarCollapsed, 'lg:w-20': isSidebarCollapsed }"
    >
      <div class="flex flex-col w-full">
        <SidebarNav />
      </div>
    </div>

    <!-- Mobile sidebar -->
    <TransitionRoot as="template" :show="isMobileSidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="isMobileSidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="isMobileSidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <SidebarNav @close="isMobileSidebarOpen = false" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Main content -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Top header -->
      <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
        <button
          type="button"
          class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand lg:hidden"
          @click="isMobileSidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex flex-1 justify-between px-4">
          <div class="flex flex-1">
            <h1 class="text-2xl font-semibold text-gray-900">Feedback Management</h1>
          </div>
        </div>
      </div>

      <!-- Main content area -->
      <main class="flex-1 overflow-y-auto bg-gray-100">
        <div class="py-6">
          <FeedbackList />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import SidebarNav from '@/admin/components/SidebarNav.vue'
import FeedbackList from './FeedbackList.vue'

const isSidebarCollapsed = ref(false)
const isMobileSidebarOpen = ref(false)
</script>
