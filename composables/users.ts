import { HttpVerbs } from '~/composables/feedbacks'

export const useUsers = () => {
  const fetchCurrentUser = async () => {
    const { data, error } = await $fetch('/api/current-user', {
      method: HttpVerbs.Get,
    })

    if (error && error?.message) {
      throw new Error(error.message)
    }
    return { data }
  }

  return { fetchCurrentUser }
}
