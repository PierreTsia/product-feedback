<script lang="ts" setup>
const router = useRouter()
const route = useRoute()

const handleGoBack = () => {
  if (route.params.id && route.name !== 'feedback-id') {
    router.push(`/feedback/${route.params.id}`)
  } else {
    router.push('/')
  }
}
</script>

<template>
  <span
    class="group cursor-pointer text-sm text-yankee-blue inline-flex justify-center items-center"
    @click="handleGoBack">
    <img
      class="w-2 inline-block mr-2"
      src="/assets/shared/icon-arrow-left.svg"
      alt="go back icon" />
    <span class="font-bold group-hover:underline">Go back</span>
  </span>
</template>
