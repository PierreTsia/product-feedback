<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFeedbackStore } from '~/store/feedback.store'
const feedbackStore = useFeedbackStore()

const { activeFeedback, isLoading } = storeToRefs(feedbackStore)

const route = useRoute()

onMounted(() => {
  feedbackStore.fetchAllCategories()
  if (!activeFeedback.value || activeFeedback.value?.id !== +route.params.id) {
    feedbackStore.fetchFeedbackById(`${route.params.id}`)
  }
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <FeedbackForm
    v-else-if="activeFeedback"
    :feedback="activeFeedback"
    class="mt-12" />
</template>
