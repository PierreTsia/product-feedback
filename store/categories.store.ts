import { defineStore } from 'pinia'

import { useFeedbacks } from '~/composables/feedbacks'
import type { FeedbackCategory } from '~/composables/types'

const { getCategories } = useFeedbacks()

interface State {
  categories: FeedbackCategory[]
}

export const useCategoriesStore = defineStore('categories', {
  state: (): State => {
    return {
      categories: [],
    }
  },
  actions: {
    async fetchAllCategories() {
      this.categories = (await getCategories()) ?? []
    },
  },
})
