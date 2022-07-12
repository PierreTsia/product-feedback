<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { ValidationFn } from '~/composables/inputValidation'

interface TextInputProps {
  modelValue: string
  isError?: boolean
  placeholder?: string
  rules?: ValidationFn[]
}
const props = withDefaults(defineProps<TextInputProps>(), {
  modelValue: '',
  isError: false,
  placeholder: '',
})

const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
const inputRef = ref(null)
const isFocused = ref(false)
const hasBeenFocused = ref(false)

const errorMessages = computed(() => {
  if (!props.rules?.length)
    return []

  return props.rules
    .map(r => r(props.modelValue))
    .filter(e => typeof e === 'string')
})

const hasError = computed(() => {
  return !!errorMessages.value.length
})
const setFocus = (arg = true) => {
  hasBeenFocused.value = true
  isFocused.value = arg
}
</script>

<template>
  <div class="h-15 w-full">
    <input
      ref="inputRef"
      v-model="data"
      class="appearance-none bg-ghost-white rounded py-2 px-3 text-east-bay-blue text-sm mb-3 leading-tight focus:outline-none focus:shadow-outline mr-2 w-full"
      :class="{
        'border border-royal-blue': isFocused,
        'border border-vivid-red text-vivid-red': hasBeenFocused && hasError,
      }"
      :placeholder="props.placeholder"
      @focus="setFocus()"
      @blur="setFocus(false)"
    >
    <p
      v-if="hasBeenFocused && hasError"
      class="text-vivid-red text-3 -mt-2 italic text-left max-w-full"
    >
      {{ errorMessages[0] }}
    </p>
  </div>
</template>
