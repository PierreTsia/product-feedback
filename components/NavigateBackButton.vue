<script lang="ts" setup>
defineEmits<{
  (e: 'onGoBack'): void
}>()
</script>

<template>
  <span
    class="group cursor-pointer text-sm text-yankee-blue inline-flex justify-center items-center"
    @click="$emit('onGoBack')">
    <img
      class="w-2 inline-block mr-2"
      src="/assets/shared/icon-arrow-left.svg"
      alt="go back icon" />
    <span class="font-bold group-hover:underline">Go back</span>
  </span>
</template>
