import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export const useFilterStore = defineStore('filters', () => {
  const activeFilters: Ref<number[]> = ref([])

  const areAllSelected = computed(() => !activeFilters.value.length)

  const addFilter = (categoryId: number) => {
    if (activeFilters.value.includes(categoryId)) {
      return
    }
    activeFilters.value.push(categoryId)
  }

  const removeFilter = (categoryId: number) => {
    activeFilters.value = activeFilters.value.filter((id) => id !== categoryId)
  }

  const resetFilters = () => {
    activeFilters.value = []
  }

  return {
    activeFilters,
    areAllSelected,
    addFilter,
    removeFilter,
    resetFilters,
  }
})
