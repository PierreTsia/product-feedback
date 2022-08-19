<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFeedbackStore } from '~/store/feedback.store'

const feedbackStore = useFeedbackStore()

const { statusesCount } = storeToRefs(feedbackStore)

onMounted(() => {
  feedbackStore.countFeedbacksByStatuses()
})
</script>

<template>
  <div class="flex flex-col rounded-xl shadow-sm bg-white p-4">
    <section class="min-w-full flex justify-between mb-4">
      <h1 class="font-bold text-18px text-yankee-blue text-left">Roadmap</h1>
      <nuxt-link
        class="font-thin text-royal-blue text-md cursor-pointer hover:underline"
        to="/roadmap">
        View
      </nuxt-link>
    </section>
    <ul class="w-full flex flex-col">
      <li
        v-for="status in statusesCount"
        :key="status.status_id"
        class="w-full flex justify-between items-center">
        <BaseStatusPill :color="status.status_color" />
        <span class="text-left w-full text-dark-blue-gray">{{
          status.status_name
        }}</span>
        <span class="text-left text-dark-blue-gray text-md font-bold">{{
          status.status_count
        }}</span>
      </li>
    </ul>
  </div>
</template>
