<script lang="ts" setup>
import type { FeedbackCategory, FormKey, InputType } from '~/composables/types'

const props = withDefaults(defineProps<FormFieldProps>(), {
  title: 'Feedback title',
  description: 'Add a short, descriptive headline',
  value: '',
  type: 'text',
  slug: 'title' as FormKey,
})
defineEmits<{
  (e: 'onChange', val: string | number, slug: FormKey): void
}>()
interface FormFieldProps {
  title: string
  description: string
  value: string | FeedbackCategory
  slug: FormKey
  type?: InputType
  options?: FeedbackCategory[]
  error?: string | null
}

const selectModelValue = computed(() => {
  return props?.options?.find((o: FeedbackCategory) => o.id === props.value?.id )
})
</script>

<template>
  <section class="px-4">
    <h4 class="font-bold text-sm text-left text-primary">{{ title }}</h4>
    <h6 class="font-thin text-xs text-left text-secondary mb-2">
      {{ description }}
    </h6>
    <TextInput
      v-if="type === 'text'"
      :model-value="value"
      :error-message="error"
      @update:model-value="(v) => $emit('onChange', v, slug)" />
    <TextAreaInput
      v-else-if="type === 'textarea'"
      :model-value="value"
      :error-message="error"
      @update:model-value="(v) => $emit('onChange', v, slug)" />
    <SelectInput
      v-else-if="type === 'select'"
      :options="options"
      :model-value="selectModelValue"
      @on-select-option="(o) => $emit('onChange', o, slug)" />
  </section>
</template>
