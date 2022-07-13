<script setup lang="ts">
import type { FeedbackDto } from '~/composables/feedbacks'

defineProps<{ feedback: FeedbackDto }>()
</script>

<template>
  <div class="flex flex-row rounded-xl shadow-sm bg-white py-6">
    <div class="hidden sm:flex sm:flex-none w-2/10 items-start justify-center">
      <span
        class="tag text-13px flex flex-col items-center justify-center h-14 w-40px px-0">
        <img
          class="w-3 inline-block mb-2"
          src="/assets/shared/icon-arrow-up.svg"
          alt="icon arrow down" />
        <span class="text-yankee-blue"> {{ feedback.upvotes }}</span>
      </span>
    </div>
    <div class="grow px-2 sm:px-0">
      <h1 class="font-bold text-18px text-yankee-blue text-left">
        {{ feedback.title }}
      </h1>
      <h6 class="font-light text-16px text-dark-blue-gray text-left">
        {{ feedback.description }}
      </h6>
      <div class="w-full flex justify-start mt-4">
        <span class="tag text-13px">{{ feedback.category }}</span>
      </div>
      <div class="flex sm:hidden justify-between px-8 mt-10">
        <span
          class="tag text-13px flex flex-col items-center justify-center h-14 w-40px px-0">
          <img
            class="w-3 inline-block"
            src="/assets/shared/icon-arrow-up.svg"
            alt="icon arrow down" />
          <span class="text-yankee-blue"> {{ feedback.upvotes }}</span>
        </span>

        <span
          class="text-13px flex flex-row items-center justify-center h-14 w-40px px-0 cursor-pointer">
          <img
            class="w-5 inline-block"
            src="/assets/shared/icon-comments.svg"
            alt="icon arrow down" />
          <span class="text-yankee-blue font-bold text-16px">
            {{ feedback.comments?.length ?? 0 }}</span
          >
        </span>
      </div>
    </div>
    <div
      class="hidden sm:flex sm:flex-none w-2/10 flex-col items-center justify-center">
      <span
        class="text-13px flex flex-row items-center justify-center h-14 w-40px px-0 cursor-pointer">
        <img
          class="w-5 inline-block mr-2"
          src="/assets/shared/icon-comments.svg"
          alt="icon arrow down" />
        <span class="text-yankee-blue font-bold text-16px">
          {{ feedback.comments?.length ?? 0 }}</span
        >
      </span>
    </div>
  </div>
</template>
