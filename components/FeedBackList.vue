<script setup lang="ts">
import { useFeedbacks } from '~/composables/feedbacks'
const { feedbacks } = await useFeedbacks()
</script>

<template>
  <pre>{{ feedbacks }}</pre>
</template>
