<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useFeedbackStore } from '~/store/feedback.store'

const feedbackStore = useFeedbackStore()
const { feedbacks, isLoading } = storeToRefs(feedbackStore)

onMounted(async () => {
  if (feedbacks.value.length <= 1) {
    await feedbackStore.fetchAllFeedbacks()
  }
})
</script>

<template>
  <div>
    <div
      v-if="isLoading"
      class="flex flex-col justify-center h-200 op50 italic">
      <!-- TODO replace with skeleton -->
      <span class="animate-pulse">Loading...</span>
    </div>
    <div v-else>
      <TopBar class="mb-4" />
      <FeedBackList :feedbacks="feedbacks" />
    </div>
  </div>
</template>
