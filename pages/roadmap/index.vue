<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFeedbackStore } from '~/store/feedback.store'

const feedbackStore = useFeedbackStore()

const { feedbacks } = storeToRefs(feedbackStore)

onMounted(() => {
  if (!feedbacks.value?.length) {
    feedbackStore.fetchAllFeedbacks()
  }
})
</script>

<template>
  <div class="py-2 px-4 w-full max-w-1200px mx-auto min-h-screen flex flex-col">
    <section
      class="w-full bg-yankee-blue py-4 md:px-6 px-1 rounded-none md:rounded-lg text-white flex justify-between items-center text-xs md:text-sm">
      <div>
        <NavigateBackButton class="text-white text-xs" />
        <h1 class="text-lg font-bold pl-4">Roadmap</h1>
      </div>
      <BaseAddFeedbackButton />
    </section>
    <section class="mt-4">
      <KanbanView />
    </section>
  </div>
</template>
