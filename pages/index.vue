<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useFeedbackStore } from '~/store/feedback.store'

const feedbackStore = useFeedbackStore()
const { feedbacks, isLoading } = storeToRefs(feedbackStore)

onBeforeMount(async () => {
  if (feedbacks.value.length <= 1) {
    await feedbackStore.fetchAllFeedbacks()
  }
})
</script>

<template>
  <div>
    <!--    <button @click="$router.push('/create-feedback')">create</button>-->
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
