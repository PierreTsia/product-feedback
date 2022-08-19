<script lang="ts" setup>
import type { Ref } from 'vue'
import type { Comment } from '~/composables/types'
import { useFeedbackStore } from '~/store/feedback.store'

const props = withDefaults(
  defineProps<{ comment: Comment; canReply: boolean }>(),
  {
    canReply: true,
  }
)

const feedbackStore = useFeedbackStore()

const isReplying: Ref<boolean> = ref(false)
const replyText: Ref<string> = ref('')

const updateReplyText = (content: string) => {
  replyText.value = content
}

const toggleReply = () => {
  isReplying.value = !isReplying.value
}

const postCommentReply = () => {
  feedbackStore.addReplyToComment({
    content: replyText.value,
    commentId: props.comment.id,
  })
  replyText.value = ''
  toggleReply()
}
</script>

<template>
  <div class="flex mt-4">
    <div class="w-1/10 pt-4 mb-4 relative overflow-hidden">
      <img
        class="w-10 inline-block mb-2 rounded-full"
        :src="`/assets/user-images/${comment.user.image}`"
        alt="user avatar" />
      <span
        v-if="comment.comment_replies?.length"
        class="border-l-1 border-l-gray-200 h-full absolute top-18 left-50%" />
    </div>
    <div class="w-9/10 flex flex-col py-3 px-4 mb-6 relative">
      <button
        v-if="canReply"
        class="absolute right-6 font-bold text-royal-blue text-md cursor-pointer hover:underline"
        @click="toggleReply">
        reply
      </button>

      <h1 class="text-md font-bold text-yankee-blue text-left">
        {{ comment.user.name }}
      </h1>
      <h2 class="text-dark-blue-gray text-left text-sm mb-6">
        @{{ comment.user.username }}
      </h2>
      <p class="text-dark-blue-gray text-md text-left">
        {{ comment.content }}
      </p>

      <div v-if="comment.comment_replies?.length">
        <CommentsCard
          v-for="reply in comment.comment_replies"
          :key="reply.id"
          :can-reply="false"
          :comment="reply"
          class="-ml-4" />
      </div>
      <BaseExpander v-if="canReply" :open="isReplying" class="w-full">
        <div class="mt-8 w-full flex flex-col md:flex-row items-start">
          <BaseInputTextArea
            :model-value="replyText"
            class="mb-4 md:mb-0 w-full md:w-8/12"
            @update:model-value="updateReplyText" />
          <div class="w-full md:w-4/12 flex justify-center">
            <button class="btn btn-primary h-60px" @click="postCommentReply">
              Post Reply
            </button>
          </div>
        </div>
      </BaseExpander>
    </div>
  </div>
</template>
