

interface FeedbackDto {
  id: number
  title: string
  category: string
  upvotes: number
  status: string
  description: string
}

const state = reactive({
  feedbacks: [] as FeedbackDto[],
  errors: null as any,
})

export const useFeedbacks = async () => {
  const { data, error } = await useFetch('/api/feedBacks')
  state.feedbacks = data.value?.productRequests as FeedbackDto[] ?? []
  state.errors = error.value

  return { ...toRefs(state) }
}
