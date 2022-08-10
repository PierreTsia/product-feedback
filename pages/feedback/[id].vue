<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFeedbackStore } from '~/store/feedback.store'

const feedbackStore = useFeedbackStore()
const { activeFeedback, isLoading } = storeToRefs(feedbackStore)
const route = useRoute()

onBeforeMount(async () => {
  await feedbackStore.fetchFeedbackById(route.params.id as string)
})
</script>

<template>
  <div v-if="activeFeedback">
    <h1>{{ activeFeedback.title }}</h1>
  </div>
</template>
