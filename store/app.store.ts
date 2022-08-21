import { defineStore } from 'pinia'

interface State {
  isDrawerOpen: boolean
}

export const useAppStore = defineStore('app', {
  state: (): State => {
    return {
      isDrawerOpen: false,
    }
  },
  actions: {
    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen
    },
    closeDrawer() {
      this.isDrawerOpen = false
    },
  },
})
