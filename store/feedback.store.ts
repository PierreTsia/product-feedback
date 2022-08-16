import type { Ref } from '@vue/reactivity'
import { defineStore } from 'pinia'
import type { FeedbackDto } from '~/composables/feedbacks'
import { useFeedbacks } from '~/composables/feedbacks'
import type { FeedbackCategory } from '~/composables/types'
import { OrderBy, OrderDirection } from '~/composables/types'

const {
  getFeedbacks,
  createNewFeedback,
  getFeedbackById,
  getCategories,
  updateFeedbackById,
  deleteFeedbackById,
} = useFeedbacks()

export const useFeedbackStore = defineStore('feedbacks', () => {
  const router = useRouter()

  const feedbacks: Ref<FeedbackDto[]> = ref([] as FeedbackDto[])
  const isLoading: Ref<boolean> = ref(false)
  const activeFeedback: Ref<FeedbackDto | null> = ref(null)
  const categories: Ref<FeedbackCategory[]> = ref([])

  const fetchAllFeedbacks = async () => {
    isLoading.value = true
    feedbacks.value = await getFeedbacks({
      orderBy: OrderBy.CreatedAt,
      direction: OrderDirection.Asc,
    })
    isLoading.value = false
  }

  const fetchAllCategories = async () => {
    categories.value = (await getCategories()) ?? []
  }

  const fetchFeedbackById = async (id: string) => {
    isLoading.value = true
    activeFeedback.value = await getFeedbackById(+id)
    isLoading.value = false
  }

  const addFeedback = async (
    feedback: any,
    redirectRoute?: string
  ): Promise<void> => {
    isLoading.value = true

    try {
      const newFeedback = await createNewFeedback(feedback)
      isLoading.value = false
      if (newFeedback) {
        feedbacks.value.push(newFeedback)
      }
      if (redirectRoute) {
        router.push(redirectRoute)
      }
    } catch (error) {
      console.error(error)
      isLoading.value = false
    }
  }

  const updateFeedback = async (
    feedbackId: number,
    feedback: any,
    redirectRoute?: string
  ) => {
    isLoading.value = true

    try {
      const { category, ...rest } = feedback
      const payload = { ...rest, category: category.id }
      const updatedFeedback = await updateFeedbackById(feedbackId, payload)
      if (updatedFeedback) {
        const replacedIndex = feedbacks.value.findIndex(
          (f) => f.id === updatedFeedback.id
        )
        feedbacks.value[replacedIndex] = updatedFeedback
        if (redirectRoute) {
          router.push(redirectRoute)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  const deleteFeedback = async (feedbackId: number) => {
    isLoading.value = true

    try {
      await deleteFeedbackById(feedbackId)
      feedbacks.value = feedbacks.value.filter((f) => f.id !== feedbackId)
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    feedbacks,
    categories,
    fetchAllFeedbacks,
    fetchAllCategories,
    fetchFeedbackById,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    isLoading,
    activeFeedback,
  }
})
