<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '~/store/app.store'
import { useUserStore } from '~/store/user.store'

const userStore = useUserStore()
const appStore = useAppStore()
const { isDrawerOpen } = storeToRefs(appStore)

onMounted(async () => {
  await userStore.fetchMe()
})
</script>

<template>
  <main
    class="pb-6 pt-0 md:pt-6 px-0 md:px-10 text-center bg-alice-gray min-h-screen"
    :class="{ 'overflow-hidden max-h-screen': isDrawerOpen }">
    <slot />
    <Footer />
  </main>
</template>
