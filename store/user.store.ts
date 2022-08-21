import { defineStore } from 'pinia'
import type { User } from '~/composables/types'
import { useUsers } from '~/composables/users'

interface State {
  currentUser: User | null
}

const { fetchCurrentUser } = useUsers()
export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      currentUser: null,
    }
  },
  actions: {
    async fetchMe() {
      const { data } = await fetchCurrentUser()
      this.currentUser = data
    },
  },
})
