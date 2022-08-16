import type { Ref } from '@vue/reactivity'
import { defineStore } from 'pinia'
import type { FeedbackDto } from '~/composables/feedbacks'
import { useFeedbacks } from '~/composables/feedbacks'
import type { FeedbackCategory} from '~/composables/types';
import { OrderBy, OrderDirection } from '~/composables/types'

const { getFeedbacks, createNewFeedback, getFeedbackById, getCategories } =
  useFeedbacks()

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

  return {
    feedbacks,
    categories,
    fetchAllFeedbacks,
    fetchAllCategories,
    fetchFeedbackById,
    addFeedback,
    isLoading,
    activeFeedback,
  }
})
