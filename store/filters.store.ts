import { defineStore } from 'pinia'
import { OrderBy, OrderDirection } from '~/composables/types'

interface State {
  activeFilters: number[]
  orderBy: OrderBy
  orderDirection: OrderDirection
}

export const useFilterStore = defineStore('filters', {
  state: (): State => ({
    activeFilters: [],
    orderBy: OrderBy.CreatedAt,
    orderDirection: OrderDirection.Asc,
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
    setOrderBy(orderBy: OrderBy, orderDirection: OrderDirection) {
      this.orderBy = orderBy
      this.orderDirection = orderDirection
    },
  },
})
