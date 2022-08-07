<script setup lang="ts">
import { useFeedbacks } from '~/composables/feedbacks'
const { feedbacks, getFeedbacks } = await useFeedbacks()
onBeforeMount(async () => {
  if (!feedbacks.value?.length) {
    await getFeedbacks()
  }
})
</script>

<template>
  <ul class="flex flex-col gap-2">
    <FeedBackCard
      v-for="(feedback, i) in feedbacks"
      :key="i"
      class="mb-8 w-full"
      :feedback="feedback" />
  </ul>
</template>
