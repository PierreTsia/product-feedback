<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFeedbackStore } from '~/store/feedback.store'

const feedbackStore = useFeedbackStore()
const { activeFeedback, isLoading } = storeToRefs(feedbackStore)
const route = useRoute()

onMounted(async () => {
  await feedbackStore.fetchFeedbackById(route.params.id as string)
})
</script>

<template>
  <div class="max-w-800px mx-auto">
    <aside class="flex justify-between px-4 py-2 mb-5">
      <NavigateBackButton />
      <button class="btn btn-secondary">Edit Feedback</button>
    </aside>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="activeFeedback">
      <FeedBackCard :feedback="activeFeedback" class="mb-4" />
      <CommentsList :comments="activeFeedback.comments" />
    </div>
    <NotFound v-else />
  </div>
</template>
