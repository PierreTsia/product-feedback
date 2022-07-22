<script lang="ts" setup>
import { useFeedbackForm } from '~/composables/feedback-form'

const { createFields, form, errors, setFormField } = useFeedbackForm()
const title = computed(() => {
  return 'Create New Feedback'
})
</script>

<template>
  <div
    class="pt-20 pb-8 px-6 flex flex-col bg-white rounded-lg w-full md:w-2/3 mx-auto relative">
    <img
      class="w-14 absolute -top-7 left-10"
      src="/assets/shared/icon-new-feedback.svg"
      alt="new feedback icon" />

    <section class="px-4 mb-8">
      <h1 class="font-bold text-24px text-left text-primary">{{ title }}</h1>
    </section>
    <FormField
      v-for="(field, i) in createFields"
      :key="i"
      class="mb-6"
      :title="field.title"
      :description="field.description"
      :options="field?.options"
      :type="field.type"
      :slug="field.slug"
      :value="form[field.slug]"
      :error="errors.get(field.slug)"
      @on-change="(v) => setFormField(field.slug, v)" />
    <section class="mt-6 flex justify-end px-4">
      <button class="btn btn-accent mr-4">Cancel</button>
      <button class="btn btn-primary">Create new</button>
    </section>
  </div>
</template>
