import { defineStore, storeToRefs } from 'pinia'
import { useComments } from '~/composables/comments'

import type { Comment } from '~/composables/types'
import { useFeedbackStore } from '~/store/feedback.store'
import { useUserStore } from '~/store/user.store'

const { postNewComment, replyToComment } = useComments()

interface State {
  comments: Comment[]
}

export const useCommentsStore = defineStore('comments', {
  state: (): State => {
    return {
      comments: [],
    }
  },
  actions: {
    async addCommentToFeedback({
      content,
      feedbackId,
    }: {
      content: string
      feedbackId: number
    }) {
      const userStore = useUserStore()
      const feedbackStore = useFeedbackStore()
      const { currentUser } = storeToRefs(userStore)
      const { activeFeedback } = storeToRefs(feedbackStore)

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
    },
    async addReplyToComment({
      content,
      commentId,
    }: {
      content: string
      commentId: number
    }) {
      const userStore = useUserStore()
      const feedbackStore = useFeedbackStore()
      const { currentUser } = storeToRefs(userStore)
      const { activeFeedback } = storeToRefs(feedbackStore)

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
            activeFeedback.value.comments[commentIndex].comment_replies = [
              reply,
            ]
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
})
