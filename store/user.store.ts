import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { User } from '~/composables/types'
import { useUsers } from '~/composables/users'

export const useUserStore = defineStore('user', () => {
  const { fetchCurrentUser } = useUsers()
  const currentUser: Ref<User | null> = ref(null)

  const fetchMe = async () => {
    const { data } = await fetchCurrentUser()
    currentUser.value = data
  }

  return {
    currentUser,
    fetchMe,
  }
})
