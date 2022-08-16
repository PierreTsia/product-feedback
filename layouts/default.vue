<script lang="ts" setup>
import { useUserStore } from '~/store/user.store'

const userStore = useUserStore()
onMounted(async () => {
  await userStore.fetchMe()
})
</script>

<template>
  <main class="py-6 px-2 md:px-10 text-center bg-alice-gray min-h-screen">
    <slot />
    <Footer />
  </main>
</template>
