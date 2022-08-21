import { defineStore } from 'pinia'

import { useFeedbacks } from '~/composables/feedbacks'
import type { StatusesCount } from '~/composables/types'

interface State {
  statusesCount: StatusesCount[]
}

const { getStatusesCount } = useFeedbacks()

export const useStatusesStore = defineStore('statuses', {
  state: (): State => {
    return {
      statusesCount: [],
    }
  },
  actions: {
    async countFeedbacksByStatuses() {
      this.statusesCount = (await getStatusesCount()) ?? []
    },
  },
})
