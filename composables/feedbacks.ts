export interface FeedbackDto {
  id: number
  title: string
  category: { name: string }
  upvotes: number
  status: string
  description: string
  comments?: any[]
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

  const getFeedbacks = async () => {
    const { data } = await $fetch('/api/all-feedbacks', {
      method: 'GET',
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

  return { getFeedbacks, createNewFeedback, getFeedbackById }
}
