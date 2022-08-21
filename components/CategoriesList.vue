<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '~/store/categories.store'
import { useFeedbackStore } from '~/store/feedback.store'
import { useFilterStore } from '~/store/filters.store'

const feedbackStore = useFeedbackStore()
const filterStore = useFilterStore()
const categoriesStore = useCategoriesStore()

const { areAllSelected, activeFilters } = storeToRefs(filterStore)

const isActive = (categoryId: number) =>
  activeFilters.value?.includes(categoryId)

const { categories } = storeToRefs(categoriesStore)

const handleTagClick = (categoryId: number) => {
  if (isActive(categoryId)) {
    filterStore.removeFilter(categoryId)
  } else {
    filterStore.addFilter(categoryId)
  }
}

const resetFilters = () => {
  filterStore.resetFilters()
}
</script>

<template>
  <div
    class="flex flex-row items-center flex-wrap rounded-xl shadow-sm bg-white p-4 gap-3">
    <span
      class="tag text-13px"
      :class="{ 'tag-active': areAllSelected }"
      @click="resetFilters"
      >All</span
    >
    <span
      v-for="category in categories"
      :key="category.id"
      class="tag text-13px"
      :class="{ 'tag-active': isActive(category.id) }"
      @click="handleTagClick(category.id)"
      >{{ category.name }}</span
    >
  </div>
</template>
