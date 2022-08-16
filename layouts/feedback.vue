<script lang="ts" setup>
import { useUserStore } from '~/store/user.store'

const userStore = useUserStore()
onMounted(async () => {
  await userStore.fetchMe()
})
</script>

<template>
  <main class="py-8 px-2 md:px-10 text-center bg-alice-gray min-h-screen">
    <section class="w-full inline-flex justify-start mb-16 pl-1 md:pl-38">
      <NavigateBackButton />
    </section>
    <slot />
  </main>
</template>
