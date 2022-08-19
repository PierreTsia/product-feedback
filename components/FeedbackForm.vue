<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useFeedbackForm } from '~/composables/feedback-form'
import type { FeedbackDto } from '~/composables/feedbacks'
import { useFeedbackStore } from '~/store/feedback.store'

const props = withDefaults(defineProps<{ feedback?: FeedbackDto | null }>(), {
  feedback: null,
})

const isEditMode = computed(() => !!props?.feedback)

const imgUrl = isEditMode.value
  ? 'icon-edit-feedback.svg'
  : 'icon-new-feedback.svg'

const {
  allFormFields,
  form,
  errors,
  setFormField,
  submitForm,
  resetForm,
  isValid,
} = useFeedbackForm()

const activeFields = computed(() =>
  isEditMode.value
    ? allFormFields.value
    : allFormFields.value.filter((f) => f.slug !== 'status')
)

const title = computed(() =>
  isEditMode.value
    ? `Editing "${props.feedback?.title}"`
    : 'Create New Feedback'
)

const onCancelClick = () => {
  if (isEditMode.value && props.feedback) {
    setFormField('title', props.feedback.title)
    setFormField('description', props.feedback.description)
    setFormField('category', props.feedback.category)
  } else {
    resetForm()
  }
}

const feedbackStore = useFeedbackStore()
const onConfirmClick = () => {
  submitForm(props.feedback?.id)
}
const onDeleteClick = async () => {
  if (!props.feedback) {
    return
  }
  await feedbackStore.deleteFeedback(props.feedback?.id)
}
const { isLoading, categories, statusesCount } = storeToRefs(feedbackStore)

watch(
  () => props.feedback,
  (feedback) => {
    if (feedback) {
      setFormField('title', feedback.title)
      setFormField('description', feedback.description)
      setFormField('category', feedback.category)
      setFormField('status', feedback.status)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div
    class="pt-20 pb-8 px-6 flex flex-col bg-white rounded-lg w-full md:w-2/3 mx-auto relative">
    <img
      class="w-14 absolute -top-7 left-10"
      :src="`/assets/shared/${imgUrl}`"
      alt="new feedback icon" />

    <section class="px-4 mb-8">
      <h1 class="font-bold text-24px text-left text-primary">{{ title }}</h1>
    </section>
    <FormField
      v-for="(field, i) in activeFields"
      :key="i"
      class="mb-6"
      :title="field.title"
      :description="field.description"
      :categories="categories"
      :statuses="statusesCount"
      :type="field.type"
      :slug="field.slug"
      :value="form[field.slug]"
      :error="errors.get(field.slug)"
      @on-change="(v) => setFormField(field.slug, v)" />
    <section class="mt-6 flex justify-end px-4">
      <button
        v-if="isEditMode"
        class="btn btn-danger mr-auto"
        @click="onDeleteClick">
        Delete
      </button>
      <button class="btn btn-accent mr-4" @click="onCancelClick">Cancel</button>
      <button
        class="btn btn-primary flex"
        :class="{ 'opacity-50 cursor-not-allowed': !isValid || isLoading }"
        @click="onConfirmClick">
        <BaseLoader v-if="isLoading" />
        {{ isEditMode ? 'Edit feedback' : 'Add feedback' }}
      </button>
    </section>
  </div>
</template>
