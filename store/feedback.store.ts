import type { Ref } from '@vue/reactivity'
import { defineStore, storeToRefs } from 'pinia'
import { useComments } from '~/composables/comments'
import type { FeedbackDto } from '~/composables/feedbacks'
import { useFeedbacks } from '~/composables/feedbacks'
import type { FeedbackCategory, StatusesCount } from '~/composables/types'
import { OrderBy, OrderDirection } from '~/composables/types'
import { useFilterStore } from '~/store/filters.store'
import { useUserStore } from '~/store/user.store'

const {
  getFeedbacks,
  createNewFeedback,
  getFeedbackById,
  getCategories,
  getStatusesCount,
  updateFeedbackById,
  deleteFeedbackById,
} = useFeedbacks()

const { postNewComment, replyToComment } = useComments()

export const useFeedbackStore = defineStore('feedbacks', () => {
  const router = useRouter()
  const userStore = useUserStore()
  const { currentUser } = storeToRefs(userStore)
  const filtersStore = useFilterStore()
  const { activeFilters } = storeToRefs(filtersStore)

  const feedbacks: Ref<FeedbackDto[]> = ref([] as FeedbackDto[])
  const isLoading: Ref<boolean> = ref(false)
  const activeFeedback: Ref<FeedbackDto | null> = ref(null)
  const categories: Ref<FeedbackCategory[]> = ref([])
  const statusesCount: Ref<StatusesCount[]> = ref([])

  const feedBackByStatusId = (statusId: number) => {
    return feedbacks.value.filter((feedback) => feedback.status.id === statusId)
  }

  const fetchAllFeedbacks = async () => {
    isLoading.value = true
    feedbacks.value = await getFeedbacks({
      orderBy: OrderBy.CreatedAt,
      direction: OrderDirection.Asc,
      filters: activeFilters.value,
    })
    isLoading.value = false
  }

  const fetchAllCategories = async () => {
    categories.value = (await getCategories()) ?? []
  }

  const countFeedbacksByStatuses = async () => {
    statusesCount.value = (await getStatusesCount()) ?? []
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { category, status, ...rest } = feedback
      const payload = { ...rest, category: category.id }
      const newFeedback = await createNewFeedback(payload)
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
      const { category, status, ...rest } = feedback
      const payload = { ...rest, category: category.id, status: status.id }
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

  const addCommentToFeedback = async ({
    content,
    feedbackId,
  }: {
    content: string
    feedbackId: number
  }) => {
    if (!currentUser.value?.id) {
      return
    }

    try {
      const newComment = await postNewComment({
        content,
        feedbackId,
        userId: currentUser.value.id,
      })
      if (!activeFeedback.value) {
        return
      } else if (!activeFeedback.value?.comments?.length) {
        activeFeedback.value.comments = [newComment]
      } else {
        activeFeedback.value.comments.push(newComment)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const addReplyToComment = async ({
    content,
    commentId,
  }: {
    content: string
    commentId: number
  }) => {
    if (!currentUser.value?.id) {
      return
    }

    try {
      const reply = await replyToComment({
        content,
        commentId,
        userId: currentUser.value.id,
      })
      if (!activeFeedback.value) {
        return
      } else {
        const commentIndex: number =
          activeFeedback.value?.comments?.findIndex(
            (c) => c.id === commentId
          ) ?? 0

        if (
          activeFeedback.value?.comments?.[commentIndex]?.comment_replies
            ?.length
        ) {
          activeFeedback.value.comments[commentIndex].comment_replies.push(
            reply
          )
        } else {
          // @ts-expect-error Needs to fix this
          activeFeedback.value.comments[commentIndex].comment_replies = [reply]
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    feedbacks,
    categories,
    statusesCount,
    fetchAllFeedbacks,
    fetchAllCategories,
    feedBackByStatusId,
    countFeedbacksByStatuses,
    fetchFeedbackById,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    addCommentToFeedback,
    addReplyToComment,
    isLoading,
    activeFeedback,
  }
})
