<script lang="ts" setup>
withDefaults(defineProps<{ title?: string; description?: string }>(), {
  title: 'There is no feedback yet.',
  description:
    'Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.',
})
</script>

<template>
  <div class="flex flex-col justify-center items-center max-w-400px mx-auto min-h-200px md:min-h-600px">
    <img
      class="w-130px inline-block"
      src="/assets/suggestions/illustration-empty.svg"
      alt="illustration-empty" />
    <h1 class="text-xl font-bold mt-4 text-yankee-blue mb-3">{{ title }}</h1>
    <p class="text-dark-blue-gray text-sm text-center">{{ description }}</p>
  </div>
</template>
