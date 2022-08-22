<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import CommentInput from '~/components/comments/Input.vue'
import { useFeedbackStore } from '~/store/feedback.store'
import { useStatusesStore } from '~/store/statuses.store'

const feedbackStore = useFeedbackStore()
const statusesStore = useStatusesStore()
const { activeFeedback, isLoading } = storeToRefs(feedbackStore)
const route = useRoute()

onMounted(() => {
  feedbackStore.fetchFeedbackById(+route.params.id)
  statusesStore.countFeedbacksByStatuses()
})
</script>

<template>
  <div class="max-w-900px mx-auto">
    <aside class="flex justify-between px-4 py-2 mb-5">
      <NavigateBackButton />
      <button
        class="btn btn-secondary"
        @click="$router.push(`/update-feedback/${activeFeedback.id}`)">
        Edit Feedback
      </button>
    </aside>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="activeFeedback">
      <FeedBackCard :feedback="activeFeedback" class="mb-4" />
      <CommentsList
        v-if="activeFeedback.comments?.length"
        :comments="activeFeedback.comments"
        class="mb-4" />
      <CommentInput />
    </div>
    <NotFound v-else />
  </div>
</template>
