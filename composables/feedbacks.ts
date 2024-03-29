import type { Upvote } from '~/composables/types'
import { OrderBy, OrderDirection } from '~/composables/types'

export interface FeedbackDto {
  id: number
  title: string
  category: { name: string; id: number }
  upvotes: Upvote[]
  status: { name: string; id: number }
  description: string
  comments?: any[]
  comments_count?: number
}

interface OrderParam {
  orderBy: OrderBy
  direction?: OrderDirection
  filters?: number[]
}

export enum HttpVerbs {
  Put = 'PUT',
  Post = 'POST',
  Delete = 'DELETE',
  Get = 'GET',
}

export const useFeedbacks = () => {
  const createNewFeedback = async (feedback: any) => {
    const { data, error } = await $fetch('/api/add-feedback', {
      method: HttpVerbs.Post,
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
      method: HttpVerbs.Get,
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }

    if (data) {
      return data
    }
  }

  const getStatusesCount = async () => {
    const { data, error } = await $fetch('/api/statuses-count', {
      method: HttpVerbs.Get,
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
      orderBy: OrderBy.Comments,
      direction: OrderDirection.Desc,
    }
  ) => {
    const { data } = await $fetch('/api/all-feedbacks', {
      method: HttpVerbs.Get,
      params: orderParams,
    })

    return data ?? []
  }

  const getFeedbackById = async (id: number) => {
    // @ts-expect-error IDK why TS does not infer return type here
    const { data, error } = await $fetch(`/api/feedback/${id}`, {
      method: HttpVerbs.Get,
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }
    if (data) {
      const [newFeedback] = data
      return newFeedback
    }
  }

  const updateFeedbackById = async (feedbackId: number, feedback: any) => {
    // @ts-expect-error IDK why TS does not infer return type here
    const { data, error } = await $fetch(`/api/feedback/${feedbackId}`, {
      method: HttpVerbs.Put,
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

  const deleteFeedbackById = async (feedbackId: number) => {
    // @ts-expect-error IDK why TS does not infer return type here
    const { data, error } = await $fetch(`/api/feedback/${feedbackId}`, {
      method: HttpVerbs.Delete,
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }
    if (data) {
      const [deletedFeedback] = data
      return deletedFeedback.id
    }
  }

  const upvoteFeedback = async (feedbackId: number, userId: number) => {
    const { data, error } = await $fetch(`/api/upvote-feedback`, {
      method: HttpVerbs.Post,
      body: { feedback: feedbackId, user: userId },
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }
    if (data) {
      const [upvote] = data
      return upvote
    }
  }

  const downvoteFeedback = async (feedbackId: number, userId: number) => {
    const { data, error } = await $fetch(`/api/downvote-feedback`, {
      method: HttpVerbs.Delete,
      body: { feedback: feedbackId, user: userId },
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }
    if (data) {
      const [downvote] = data
      return downvote
    }
  }

  return {
    getFeedbacks,
    createNewFeedback,
    getFeedbackById,
    getCategories,
    getStatusesCount,
    updateFeedbackById,
    deleteFeedbackById,
    upvoteFeedback,
    downvoteFeedback,
  }
}
