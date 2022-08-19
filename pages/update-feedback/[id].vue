<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFeedbackStore } from '~/store/feedback.store'

definePageMeta({
  layout: 'feedback',
})

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
  <div v-else-if="activeFeedback" class="max-w-1200px mx-auto">
    <FeedbackForm :feedback="activeFeedback" class="mt-12 mx-auto" />
  </div>
</template>
