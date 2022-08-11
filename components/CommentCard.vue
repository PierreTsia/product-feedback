<script lang="ts" setup>
import type { Comment } from '~/composables/types'

defineProps<{ comment: Comment }>()
</script>

<template>
  <div class="flex mt-4">
    <div class="w-1/10 pt-4">
      <img
        class="w-10 inline-block mb-2 rounded-full"
        :src="`/assets/user-images/${comment.user.image}`"
        alt="user avatar" />
    </div>
    <div class="w-9/10 flex flex-col py-3 px-4 mb-6 relative">
      <button
        class="absolute right-6 font-bold text-royal-blue text-md cursor-pointer hover:underline">
        reply
      </button>

      <h1 class="text-md font-bold text-yankee-blue text-left mb-1">
        {{ comment.user.name }}
      </h1>
      <h2 class="text-dark-blue-gray text-left text-sm mb-6">
        @{{ comment.user.username }}
      </h2>
      <p class="text-dark-blue-gray text-md text-left">
        {{ comment.content }}
      </p>
    </div>
  </div>
</template>
