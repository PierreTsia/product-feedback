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
  const state = reactive({
    feedbacks: [] as FeedbackDto[],
    errors: null as any,
  })

  const addFeedback = async (feedback: any) => {
    const { data } = await $fetch('/api/add-feedback', {
      method: 'POST',
      body: feedback,
    })
    if (data) {
      const [newFeedback] = data
      state.feedbacks.unshift(newFeedback)
    }
  }

  const getFeedbacks = async () => {
    const { data, error } = await useFetch('/api/get-feedbacks')

    state.feedbacks = (data.value?.productRequests as FeedbackDto[]) ?? []
    state.errors = error.value
  }

  return { ...toRefs(state), getFeedbacks, addFeedback }
}
