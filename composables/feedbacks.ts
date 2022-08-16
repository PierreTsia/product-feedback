import { OrderBy, OrderDirection } from '~/composables/types'

export interface FeedbackDto {
  id: number
  title: string
  category: { name: string; id: number }
  upvotes: number
  status: string
  description: string
  comments?: any[]
  comments_count?: number
}

interface OrderParam {
  orderBy: OrderBy
  direction?: OrderDirection
}

export const useFeedbacks = () => {
  const createNewFeedback = async (feedback: any) => {
    const { data, error } = await $fetch('/api/add-feedback', {
      method: 'POST',
      body: feedback,
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }

    if (data) {
      const [newFeedback] = data
      return newFeedback
    }
  }

  const getCategories = async () => {
    const { data, error } = await $fetch('/api/all-categories', {
      method: 'GET',
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }

    if (data) {
      return data
    }
  }

  const getFeedbacks = async (
    orderParams: OrderParam = {
      orderBy: OrderBy.CreatedAt,
      direction: OrderDirection.Desc,
    }
  ) => {
    const { data } = await $fetch('/api/all-feedbacks', {
      method: 'GET',
      params: orderParams,
    })

    return data ?? []
  }

  const getFeedbackById = async (id: number) => {
    // @ts-expect-error IDK why TS does not infer return type here
    const { data, error } = await $fetch(`/api/feedback/${id}`, {
      method: 'GET',
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }
    if (data) {
      const [newFeedback] = data
      return newFeedback
    }
  }

  return { getFeedbacks, createNewFeedback, getFeedbackById, getCategories }
}
