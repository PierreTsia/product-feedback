<script lang="ts" setup>
import type { ComputedRef } from '@vue/reactivity'
import type {
  FeedbackCategory,
  FormKey,
  InputType,
  StatusesCount,
} from '~/composables/types'

const props = defineProps<FormFieldProps>()
defineEmits<{
  (e: 'onChange', val: string | number, slug: FormKey): void
}>()
interface FormFieldProps {
  title: string
  description: string
  value: string | FeedbackCategory | StatusesCount
  slug: FormKey
  type?: InputType
  categories?: FeedbackCategory[]
  statuses?: StatusesCount[]
  error?: string | null
}

const categoryModelValue = computed(() => {
  return props?.categories?.find(
    (o: FeedbackCategory) =>
      typeof props.value !== 'string' && o.id === props.value?.id
  ) as FeedbackCategory
})

const statusModelValue = computed(() => {
  return props?.statuses?.find(
    (o: StatusesCount) =>
      typeof props.value !== 'string' && o.id === props.value?.id
  ) as StatusesCount
})

const modelValue: ComputedRef<FeedbackCategory | StatusesCount> = computed(
  () => {
    return props?.slug === 'category'
      ? categoryModelValue.value
      : statusModelValue.value
  }
)
</script>

<template>
  <section class="px-4">
    <h4 class="font-bold text-sm text-left text-primary">{{ title }}</h4>
    <h6 class="font-thin text-xs text-left text-secondary mb-2">
      {{ description }}
    </h6>
    <BaseInputText
      v-if="type === 'text'"
      :model-value="value"
      :error-message="error"
      @update:model-value="(v) => $emit('onChange', v, slug)" />
    <BaseInputTextArea
      v-else-if="type === 'textarea'"
      :model-value="value"
      :error-message="error"
      @update:model-value="(v) => $emit('onChange', v, slug)" />
    <BaseInputSelect
      v-else-if="type === 'select'"
      :options="slug === 'category' ? categories : statuses"
      :model-value="modelValue"
      @on-select-option="(o) => $emit('onChange', o, slug)" />
  </section>
</template>
