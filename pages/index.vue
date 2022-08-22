<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import type { OrderBy, OrderDirection } from '~/composables/types'
import { useAppStore } from '~/store/app.store'
import { useFeedbackStore } from '~/store/feedback.store'
import { useCategoriesStore } from '~/store/categories.store'
import { useFilterStore } from '~/store/filters.store'

const feedbackStore = useFeedbackStore()
const categoriesStore = useCategoriesStore()
const filtersStore = useFilterStore()
const appStore = useAppStore()

const { isDrawerOpen } = storeToRefs(appStore)
const { activeFilters, orderBy, orderDirection } = storeToRefs(filtersStore)
const { feedbacks, isLoading } = storeToRefs(feedbackStore)
const { categories } = storeToRefs(categoriesStore)

onMounted(async () => {
  if (feedbacks.value.length <= 1) {
    await feedbackStore.fetchAllFeedbacks()
  }

  if (!categories.value.length) {
    await categoriesStore.fetchAllCategories()
  }
})

const handleSortChange = ({
  slug,
  direction,
}: {
  slug: OrderBy
  direction: OrderDirection
}) => {
  filtersStore.setOrderBy(slug, direction)
}

watch(
  () => activeFilters.value,
  () => {
    feedbackStore.fetchAllFeedbacks()
  },
  { immediate: false, deep: true }
)

watch(
  () => orderBy.value,
  () => {
    feedbackStore.fetchAllFeedbacks()
  },
  { immediate: false, deep: true }
)

watch(
  () => orderDirection.value,
  () => {
    feedbackStore.fetchAllFeedbacks()
  },
  { immediate: false, deep: true }
)
</script>

<template>
  <div>
    <div class="flex flex-col lg:flex-row gap-6 max-w-1200px mx-auto">
      <div
        class="hidden md:flex flex-row lg:flex-col gap-y-6 gap-x-4 w-full lg:w-4/12">
        <BaseHeader class="w-4/12 lg:w-full" />
        <CategoriesList class="w-4/12 lg:w-full" />
        <RoadmapSummary class="w-4/12 lg:w-full" />
      </div>
      <div class="flex flex-col w-full lg:w-8/12">
        <MobileTopBar :is-open="isDrawerOpen" />

        <TopBar class="mb-4" @on-sort-change="handleSortChange" />
        <div
          v-if="isLoading"
          class="flex flex-col justify-center h-200 op50 italic">
          <!-- TODO replace with skeleton -->
          <span class="animate-pulse">Loading...</span>
        </div>
        <FeedBackList v-else :feedbacks="feedbacks" />
      </div>
    </div>
    <MobileDrawer :is-open="isDrawerOpen" />
  </div>
</template>
