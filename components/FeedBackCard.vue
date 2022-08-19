<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import type { FeedbackDto } from '~/composables/feedbacks'

defineProps<{ feedback: FeedbackDto }>()

const el = ref(null)
const { width } = useElementSize(el)

const rowLayoutMinCardSize = 775
</script>

<template>
  <div ref="el" class="flex flex-row rounded-lg shadow-sm bg-white py-6 px-2">
    <div
      class="w-2/10 items-start justify-center"
      :class="width > rowLayoutMinCardSize ? 'flex' : 'hidden'">
      <span
        class="tag text-13px flex flex-col items-center justify-center h-14 w-40px px-0">
        <img
          class="w-3 inline-block mb-2"
          src="/assets/shared/icon-arrow-up.svg"
          alt="icon arrow down" />
        <span class="text-yankee-blue"> {{ feedback.upvotes }}</span>
      </span>
    </div>
    <div class="grow px-4">
      <h1 class="font-bold text-18px text-yankee-blue text-left">
        {{ feedback.title }}
      </h1>
      <h6 class="font-light text-16px text-dark-blue-gray text-left">
        {{ feedback.description }}
      </h6>
      <div class="w-full flex justify-start mt-4">
        <span class="tag text-13px">{{ feedback.category.name }}</span>
      </div>
      <div
        class="justify-between px-0 mt-6"
        :class="width > rowLayoutMinCardSize ? 'hidden' : 'flex'">
        <span
          class="tag text-13px flex flex-col items-center justify-center h-14 w-40px px-0">
          <img
            class="w-3 inline-block"
            src="/assets/shared/icon-arrow-up.svg"
            alt="icon arrow down" />
          <span class="text-yankee-blue mt-2"> {{ feedback.upvotes }}</span>
        </span>

        <span
          class="text-13px flex flex-row items-center justify-center h-14 w-40px px-0 cursor-pointer">
          <img
            class="w-5 inline-block"
            src="/assets/shared/icon-comments.svg"
            alt="icon arrow down" />
          <span class="ml-2 text-yankee-blue font-bold text-16px">
            {{ feedback.comments?.length ?? 0 }}</span
          >
        </span>
      </div>
    </div>
    <div
      class="w-2/10 flex-col items-center justify-center"
      :class="width > 775 ? 'flex' : 'hidden'">
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
