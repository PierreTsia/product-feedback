<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useFeedbackStore } from '~/store/feedback.store'
import { useFilterStore } from '~/store/filters.store'

const feedbackStore = useFeedbackStore()
const filtersStore = useFilterStore()
const { activeFilters } = storeToRefs(filtersStore)
const { feedbacks, isLoading, categories } = storeToRefs(feedbackStore)

onMounted(async () => {
  if (feedbacks.value.length <= 1) {
    await feedbackStore.fetchAllFeedbacks()
  }

  if (!categories.value.length) {
    await feedbackStore.fetchAllCategories()
  }
})

watch(
  () => activeFilters.value,
  () => {
    feedbackStore.fetchAllFeedbacks()
  },
  { immediate: false, deep: true }
)
</script>

<template>
  <div>
    <div
      v-if="isLoading"
      class="flex flex-col justify-center h-200 op50 italic">
      <!-- TODO replace with skeleton -->
      <span class="animate-pulse">Loading...</span>
    </div>
    <div v-else class="flex flex-col lg:flex-row gap-2 max-w-1200px mx-auto">
      <div class="hidden md:flex flex-row lg:flex-col gap-2 w-full lg:w-4/12">
        <BaseHeader class="w-4/12 lg:w-full" />
        <CategoriesList class="w-4/12 lg:w-full" />
        <RoadmapSummary class="w-4/12 lg:w-full" />
      </div>
      <div class="flex flex-col w-full lg:w-8/12">
        <TopBar class="mb-4" />
        <FeedBackList :feedbacks="feedbacks" />
      </div>
    </div>
  </div>
</template>
