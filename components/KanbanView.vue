<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFeedbackStore } from '~/store/feedback.store'

const feedbackStore = useFeedbackStore()
const { feedBackByStatusId } = feedbackStore

const { statusesCount, feedbacks } = storeToRefs(feedbackStore)

onMounted(() => {
  if (!statusesCount.value?.length) {
    feedbackStore.countFeedbacksByStatuses()
  }
})
</script>

<template>
  <div class="flex w-full flex-col md:flex-row">
    <section
      v-for="s in statusesCount"
      :key="s.id"
      class="w-3/3 md:w-1/3 flex flex-wrap flex-col justify-start px-2">
      <div class="w-full mb-8 my-4 md:my-2">
        <h2 class="text-left font-bold text-east-bay-blue w-full">
          {{ s.name }} ({{ s.feedbacks_count }})
        </h2>
        <h6 class="text-dark-blue-gray text-left w-full">
          {{ s.description }}
        </h6>
      </div>

      <div v-if="feedbacks.length" class="flex flex-col gap-2 gap-y-6">
        <FeedBackCard
          v-for="f in feedBackByStatusId(s.id)"
          :key="f.id"
          :feedback="f"
          class="border-t border-t-8"
          :style="{ 'border-color': s.color }" />
      </div>
    </section>
  </div>
</template>
