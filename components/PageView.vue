<script setup lang="ts">
const { data } = await useFetch('/api/pageview')
</script>

<template>
  <div class="flex flex-wrap  w-full p-4">
    <div class="w-10/10 inline-flex justify-center my-2">
      <button class="btn btn-primary mr-2">
        Primary
      </button>

      <button class="btn btn-secondary mr-2">
        Secondary
      </button>
      <button class="btn btn-accent mr-2">
        Accent
      </button>

      <button class="btn btn-danger mr-2">
        Danger
      </button>
    </div> <div class="w-10/10 inline-flex justify-center my-2">
      <button class="tag mr-2">
        Ux
      </button><button class="tag tag-active mr-2">
        Active
      </button>
    </div>
  </div>
</template>
