<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { createPopper } from '@popperjs/core'
const props = withDefaults(defineProps<{ offset?: [number, number] }>(), {
  offset: () => [0, 0],
})

const dropdownRef = ref({} as HTMLElement)
const activatorRef = ref({} as HTMLElement)
const isVisible = ref(false)

const toggleDropdown = () => {
  if (isVisible.value) {
    isVisible.value = false
  } else {
    isVisible.value = true
    createPopper(activatorRef.value, dropdownRef.value, {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: props.offset,
          },
        },
      ],
    })
  }
  onClickOutside(dropdownRef, () => {
    isVisible.value = false
  })
}
</script>

<template>
  <div class="flex flex-wrap">
    <div class="relative inline-flex align-middle w-full">
      <div ref="activatorRef" class="cursor-pointer" @click="toggleDropdown">
        <slot name="activator" :activator-props="{ isVisible }" />
      </div>
      <div
        ref="dropdownRef"
        :class="[!isVisible ? 'hidden' : 'block']"
        class="relative animate-fade-in animate-count-1 animate-duration-100ms drop-down-container !z-10">
        <slot
          name="content"
          :content="{ isVisible, toggle: () => (isVisible = false) }" />
      </div>
    </div>
  </div>
</template>

<style>
.drop-down-container {
  @apply text-base list-none;
}
</style>
