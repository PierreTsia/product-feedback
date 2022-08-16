import { HttpVerbs } from '~/composables/feedbacks'

export interface CommentInput {
  content: string
  userId: number
  feedbackId: number
}

export const useComments = () => {
  const postNewComment = async ({
    content,
    userId,
    feedbackId,
  }: CommentInput) => {
    const { data, error } = await $fetch('/api/add-comment', {
      method: HttpVerbs.Post,
      body: {
        content,
        user: userId,
        feedback_id: feedbackId,
      },
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }

    if (data) {
      const [newComment] = data
      return newComment
    }
  }

  return { postNewComment }
}
