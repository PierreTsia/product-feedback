import { defineStore } from 'pinia'
import type { Ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isDrawerOpen: Ref<boolean> = ref(false)
  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  const closeDrawer = () => {
    isDrawerOpen.value = false
  }

  return {
    isDrawerOpen,
    toggleDrawer,
    closeDrawer,
  }
})
