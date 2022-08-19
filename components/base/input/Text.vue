<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { useInputValidation } from '~/composables/inputValidation'
const props = withDefaults(defineProps<TextInputProps>(), {
  modelValue: '',
  placeholder: '',
  errorMessage: null,
})

const emit = defineEmits(['update:modelValue'])

interface TextInputProps {
  modelValue: string
  isError?: boolean
  placeholder?: string
  errorMessage?: string | null
}

const data = useVModel(props, 'modelValue', emit)
const hasError = computed(() => props.errorMessage)

const { isFocused, hasBeenFocused, setFocus } = useInputValidation()
</script>

<template>
  <div class="h-10 w-full">
    <input
      ref="inputRef"
      v-model="data"
      class="mr-2 w-full appearance-none bg-ghost-white rounded py-2 px-3 text-east-bay-blue text-sm mb-3 leading-tight focus:outline-none focus:shadow-outline"
      :class="{
        'border border-royal-blue': isFocused,
        'border border-vivid-red text-vivid-red': hasBeenFocused && hasError,
      }"
      :placeholder="props.placeholder"
      @focus="setFocus()"
      @blur="setFocus(false)" />
    <p
      v-if="hasBeenFocused && hasError"
      class="text-vivid-red text-3 -mt-2 italic text-left max-w-full">
      {{ errorMessage }}
    </p>
  </div>
</template>
