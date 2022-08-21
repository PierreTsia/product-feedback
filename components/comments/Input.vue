<script lang="ts" setup>
import type { Ref } from 'vue'
import { useCommentsStore } from '~/store/comments.store'
import { useFeedbackStore } from '~/store/feedback.store'
const draftComment: Ref<string> = ref('')
const feedbackStore = useFeedbackStore()
const commentsStore = useCommentsStore()

const route = useRoute()

const updateComment = (content: string) => {
  draftComment.value = content
}

const onSubmit = () => {
  commentsStore.addCommentToFeedback({
    content: draftComment.value,
    feedbackId: +route.params.id,
  })
  draftComment.value = ''
}
</script>

<template>
  <div class="flex flex-col rounded-xl shadow-sm bg-white p-6">
    <h1 class="text-md font-bold text-yankee-blue text-left mb-4">
      Add a comment
    </h1>
    <BaseInputTextArea
      :model-value="draftComment"
      @update:model-value="updateComment" />
    <div class="w-full flex justify-end mt-4">
      <button class="btn btn-primary" @click="onSubmit">Post comment</button>
    </div>
  </div>
</template>
