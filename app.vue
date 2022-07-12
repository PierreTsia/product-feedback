<script setup lang="ts">
useHead({
  title: 'Vitesse Nuxt 3',
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/nuxt.png',
    },
  ],
})
</script>

<template>
  <NuxtLayout cl>
    <NuxtPage class="font-jost" />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
