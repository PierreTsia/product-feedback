<script lang="ts" setup>
withDefaults(defineProps<{ color: string }>(), { color: 'red' })
</script>

<template>
  <span class="w-2 h-2 rounded-full mr-6" :style="{ backgroundColor: color }" />
</template>
