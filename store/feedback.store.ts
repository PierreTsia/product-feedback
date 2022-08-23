import { defineStore, storeToRefs } from 'pinia'
import type { FeedbackDto } from '~/composables/feedbacks'
import { useFeedbacks } from '~/composables/feedbacks'
import { useFilterStore } from '~/store/filters.store'
import { useUserStore } from '~/store/user.store'

const {
  getFeedbacks,
  createNewFeedback,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
  upvoteFeedback,
  downvoteFeedback,
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

      const { activeFilters, orderBy, orderDirection } =
        storeToRefs(filtersStore)

      this.isLoading = true
      this.feedbacks = await getFeedbacks({
        orderBy: orderBy.value,
        direction: orderDirection.value,
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
          this.feedbacks.unshift(newFeedback)
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
    async upvoteFeedback(feedbackId: number) {
      const userStore = useUserStore()
      const { currentUser } = storeToRefs(userStore)
      if (!currentUser.value) {
        return
      }
      try {
        const upvote = await upvoteFeedback(feedbackId, currentUser.value.id)
        if (upvote) {
          const feedback = this.feedbacks.find((f) => f.id === feedbackId)
          const { user, id } = upvote
          if (feedback) {
            feedback.upvotes.push({ user: { id: user }, id })
          }
          if (this.activeFeedback?.id === feedbackId) {
            this.activeFeedback.upvotes.push({ user: { id: user }, id })
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async downvoteFeedback(feedbackId: number) {
      const userStore = useUserStore()
      const { currentUser } = storeToRefs(userStore)
      if (!currentUser.value) {
        return
      }
      try {
        const downvote = await downvoteFeedback(
          feedbackId,
          currentUser.value.id
        )
        if (downvote) {
          const feedback = this.feedbacks.find((f) => f.id === feedbackId)
          if (feedback) {
            feedback.upvotes = feedback.upvotes.filter(
              (upvote) => upvote.user.id !== currentUser.value?.id
            )
          }
          if (this.activeFeedback?.id === feedbackId) {
            this.activeFeedback.upvotes = this.activeFeedback.upvotes.filter(
              (upvote) => upvote.user.id !== currentUser.value?.id
            )
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
  getters: {
    feedBacksByStatusId(state: State) {
      return (statusId: number): FeedbackDto[] => {
        return state.feedbacks.filter((f) => f.status.id === statusId)
      }
    },
    hasAlreadyUpvoted(state: State) {
      const usersStore = useUserStore()
      const { currentUser } = storeToRefs(usersStore)
      return (feedbackId: number): boolean => {
        const feedback = state.feedbacks.find((f) => f.id === feedbackId)
        if (!feedback || !currentUser.value) {
          return false
        }
        return feedback.upvotes.some((u) => u.user.id === currentUser.value?.id)
      }
    },
  },
})
