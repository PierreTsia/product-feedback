<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '~/store/categories.store'
import { useFeedbackStore } from '~/store/feedback.store'
import { useStatusesStore } from '~/store/statuses.store'

definePageMeta({
  layout: 'feedback',
})

const feedbackStore = useFeedbackStore()
const categoriesStore = useCategoriesStore()
const statusesStore = useStatusesStore()

const { activeFeedback, isLoading } = storeToRefs(feedbackStore)

const route = useRoute()

onMounted(() => {
  categoriesStore.fetchAllCategories()
  if (!activeFeedback.value || activeFeedback.value?.id !== +route.params.id) {
    feedbackStore.fetchFeedbackById(+route.params.id)
  }

  statusesStore.countFeedbacksByStatuses()
})
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="activeFeedback" class="max-w-1200px mx-auto">
    <FeedbackForm :feedback="activeFeedback" class="mt-12 mx-auto" />
  </div>
</template>
