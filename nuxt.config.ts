import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt'],
  experimental: {
    reactivityTransform: true,
    viteNode: false,
  },
  unocss: {
    preflight: true,
  },
})
