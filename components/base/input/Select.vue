<script lang="ts" setup>
import type { FeedbackCategory, StatusesCount } from '~/composables/types'

interface SelectInputProps {
  options: { id: number; name: string }[]
  modelValue: FeedbackCategory | StatusesCount | null
}
const props = defineProps<SelectInputProps>()
const emit = defineEmits<{
  (e: 'onSelectOption', o: { id: number; name: string }): void
}>()

const selectedOption = ref(props?.modelValue)

const setSelectedOption = (
  option: { id: number; name: string },
  toggleDropDown: () => void
) => {
  selectedOption.value = option
  toggleDropDown()
}

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue
  },
  { immediate: false }
)

watch(selectedOption, (option) => {
  if (option) {
    emit('onSelectOption', option)
  }
})
</script>

<template>
  <BaseDropDown class="h-10">
    <template #activator="{ activatorProps }">
      <div
        class="w-250px center-between appearance-none bg-ghost-white rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline mr-2 w-full"
        :class="{ 'border border-royal-blue': activatorProps.isVisible }">
        <span v-if="selectedOption">{{ selectedOption.name }}</span>
        <img
          class="w-3 inline-block"
          src="/assets/shared/icon-arrow-down.svg"
          alt="icon arrow down" />
      </div>
    </template>

    <template #content="{ content }">
      <div class="flex flex-col w-255px rounded-lg shadow-xl bg-white">
        <ul class="flex flex-col w-full text-dark-blue-gray text-16px">
          <li
            v-for="option in options"
            :key="option.id"
            class="inline-flex items-center justify-between hover:text-russian-violet w-full px-2 py-3 cursor-pointer text-left border-b-0.5 border-gray-200 last:border-b-none"
            @click="setSelectedOption(option, content.toggle)">
            <span>{{ option.name }}</span>
            <img
              v-show="selectedOption?.id === option?.id"
              class="w-3 inline-block"
              src="/assets/shared/icon-check.svg"
              alt="icon arrow down" />
          </li>
        </ul>
      </div>
    </template>
  </BaseDropDown>
</template>
