<script setup lang="ts">
import type { FeedbackDto } from '~/composables/feedbacks'
defineProps<{ feedbacks: FeedbackDto[] }>()
</script>

<template>
  <ul class="flex flex-col gap-2 cursor-pointer px-2 md:px-0">
    <FeedBackCard
      v-for="(feedback, i) in feedbacks"
      :key="i"
      class="mb-8 w-full"
      :feedback="feedback" />
  </ul>
</template>
