import { HttpVerbs } from '~/composables/feedbacks'

export interface CommentInput {
  content: string
  userId: number
  feedbackId: number
}
export interface ReplyInput {
  content: string
  userId: number
  commentId: number
}

export const useComments = () => {
  const replyToComment = async ({ content, commentId, userId }: ReplyInput) => {
    const { data, error } = await $fetch('/api/reply-to-comment', {
      method: HttpVerbs.Post,
      body: {
        content,
        user: userId,
        comment: commentId,
      },
    })
    if (error && error?.message) {
      throw new Error(error.message)
    }

    if (data) {
      const [reply] = data
      return reply
    }
  }

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

  return { postNewComment, replyToComment }
}
