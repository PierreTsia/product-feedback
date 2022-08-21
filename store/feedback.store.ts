import { defineStore, storeToRefs } from 'pinia'
import type { FeedbackDto } from '~/composables/feedbacks'
import { useFeedbacks } from '~/composables/feedbacks'
import { OrderBy, OrderDirection } from '~/composables/types'
import { useFilterStore } from '~/store/filters.store'

const {
  getFeedbacks,
  createNewFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
} = useFeedbacks()

interface State {
  feedbacks: FeedbackDto[]
  activeFeedback: FeedbackDto | null
  isLoading: boolean
}

export const useFeedbackStore = defineStore('feedbacks', {
  state: (): State => {
    return {
      feedbacks: [],
      activeFeedback: null,
      isLoading: false,
    }
  },
  actions: {
    async fetchAllFeedbacks() {
      const filtersStore = useFilterStore()
      const { activeFilters } = storeToRefs(filtersStore)

      this.isLoading = true
      this.feedbacks = await getFeedbacks({
        orderBy: OrderBy.CreatedAt,
        direction: OrderDirection.Asc,
        filters: activeFilters.value,
      })
      this.isLoading = false
    },
    async fetchFeedbackById(id: number) {
      this.isLoading = true
      this.activeFeedback = await getFeedbackById(+id)
      this.isLoading = false
    },

    async addFeedback(feedback: any, redirectRoute?: string) {
      const router = useRouter()
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { category, status, ...rest } = feedback
        const payload = { ...rest, category: category.id }
        const newFeedback = await createNewFeedback(payload)
        this.isLoading = false
        if (newFeedback) {
          this.feedbacks.push(newFeedback)
        }
        if (redirectRoute) {
          router.push(redirectRoute)
        }
      } catch (error) {
        console.error(error)
        this.isLoading = false
      }
    },

    async updateFeedback(
      feedbackId: number,
      feedback: any,
      redirectRoute?: string
    ) {
      const router = useRouter()

      this.isLoading = true

      try {
        const { category, status, ...rest } = feedback
        const payload = { ...rest, category: category.id, status: status.id }
        const updatedFeedback = await updateFeedbackById(feedbackId, payload)
        if (updatedFeedback) {
          const replacedIndex = this.feedbacks.findIndex(
            (f) => f.id === updatedFeedback.id
          )
          this.feedbacks[replacedIndex] = updatedFeedback
          if (redirectRoute) {
            router.push(redirectRoute)
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async deleteFeedback(feedbackId: number) {
      const router = useRouter()

      this.isLoading = true

      try {
        await deleteFeedbackById(feedbackId)
        this.feedbacks = this.feedbacks.filter((f) => f.id !== feedbackId)
        router.push('/')
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
  getters: {
    feedBacksByStatusId(state: State) {
      return (statusId: number): FeedbackDto[] => {
        return state.feedbacks.filter((f) => f.status.id === statusId)
      }
    },
  },
})
