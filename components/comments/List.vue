<script lang="ts" setup>
import type { Comment } from '~/composables/types'

defineProps<{ comments: Comment[] }>()
</script>

<template>
  <div class="bg-white rounded-lg flex flex-col py-3 px-8">
    <h1 class="text-xl font-bold text-yankee-blue text-left">
      {{ comments?.length }} Comments
    </h1>

    <CommentsCard
      v-for="(comment, i) in comments"
      :key="i"
      :comment="comment"
      class="border-b border-gray-200 border-b-0.5 last:border-0" />
  </div>
</template>
