<script lang="ts" setup>
import { useAppStore } from '~/store/app.store'

withDefaults(defineProps<{ isOpen: boolean }>(), {
  isOpen: false,
})

const { toggleDrawer } = useAppStore()
</script>

<template>
  <div
    class="flex md:hidden w-full bg-cover bg-center h-70px p-2 px-4 text-white flex justify-between items-center"
    :style="{
      backgroundImage: `url('/assets/suggestions/mobile/background-header.png')`,
    }">
    <div>
      <h1 class="text-left font-bold text-xl">Front-end Mentor</h1>
      <h6 class="text-left">Feedback Board</h6>
    </div>
    <div class="cursor-pointer" @click="toggleDrawer">
      <img
        v-if="!isOpen"
        class="w-6 inline-block"
        src="/assets/shared/mobile/icon-hamburger.svg"
        alt="icon menu" />
      <img
        v-else
        class="w-6 inline-block"
        src="/assets/shared/mobile/icon-close.svg"
        alt="icon close" />
    </div>
  </div>
</template>
