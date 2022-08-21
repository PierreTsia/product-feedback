import { defineStore } from 'pinia'

interface State {
  activeFilters: number[]
}

export const useFilterStore = defineStore('filters', {
  state: (): State => ({
    activeFilters: [],
  }),
  getters: {
    areAllSelected: (state: State): boolean => {
      return !state.activeFilters.length
    },
  },
  actions: {
    addFilter(categoryId: number) {
      if (this.activeFilters.includes(categoryId)) {
        return
      }
      this.activeFilters.push(categoryId)
    },
    removeFilter(categoryId: number) {
      this.activeFilters = this.activeFilters.filter((id) => id !== categoryId)
    },

    resetFilters() {
      this.activeFilters = []
    },
  },
})
