<script lang="ts" setup>
import type { FormKey, InputType } from '~/composables/types'

withDefaults(defineProps<FormFieldProps>(), {
  title: 'Feedback title',
  description: 'Add a short, descriptive headline',
  value: '',
  type: 'text',
  slug: 'title' as FormKey,
})

defineEmits<{
  (e: 'onChange', val: string, slug: FormKey): void
}>()

interface FormFieldProps {
  title: string
  description: string
  value: string
  slug: FormKey
  type?: InputType
  options?: { id: number; name: string }[]
  error?: string | null
}
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
      @on-select-option="(o) => $emit('onChange', o.name, slug)" />
  </section>
</template>
