<script lang="ts" setup>
withDefaults(defineProps<{ isOpen: boolean }>(), {
  isOpen: false,
})
</script>

<template>
  <div>
    <div
      class="z-index-10 absolute inset-0 h-screen bg-primary top-70px bg-black"
      :class="isOpen ? 'w-full opacity-30' : 'w-0 opacity-0'" />

    <div
      class="top-70px z-index-12 absolute right-0 overflow-hidden overflow-y-scroll bg-ghost-white transition-all"
      :class="isOpen ? ['w-7/10', 'w-1/4'] : ['w-0', 'pl-0']">
      <div
        v-if="isOpen"
        class="w-full h-screen flex flex-col flex-1 bg-ghost-white p-4">
        <CategoriesList class="mb-10" />
        <RoadmapSummary />
      </div>
    </div>
  </div>
</template>
