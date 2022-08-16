import type { Ref } from '@vue/reactivity'

import { useInputRules } from '~/composables/inputValidation'
import type {
  CreateFeedbackForm,
  FeedbackCategory,
  FeedbackComposition,
  Field,
  FieldErrors,
  FormKey,
  InputType,
} from '~/composables/types'
import { useFeedbackStore } from '~/store/feedback.store'

export const useFeedbackForm = (): FeedbackComposition => {
  const feedbackStore = useFeedbackStore()

  const { hasMinLength, hasMaxLength } = useInputRules()

  const form: Ref<CreateFeedbackForm> = ref({
    title: '',
    category: { name: 'Select a category', id: 0 },
    description: '',
  })

  const setFormField = (slug: FormKey, value: string | FeedbackCategory) => {
    // @ts-expect-error type is correct
    form.value[slug] = value
  }

  const resetForm = () => {
    form.value = {
      title: '',
      category: { name: '', id: 0 },
      description: '',
    }
  }

  const errors: Ref<FieldErrors> = ref(
    new Map([
      ['title' as FormKey, null],
      ['description' as FormKey, null],
      ['category' as FormKey, null],
      ['description' as FormKey, null],
    ])
  )

  const isValid = computed(() => {
    let isValid = true
    for (const [, value] of errors.value.entries()) {
      if (value !== null) {
        isValid = false
      }
    }
    return isValid
  })

  const submitForm = async (feedbackId?: number) => {
    if (!isValid.value) {
      return
    }
    if (feedbackId) {
      await feedbackStore.updateFeedback(
        feedbackId,
        form.value,
        `/feedback/${feedbackId}`
      )
    } else {
      await feedbackStore.addFeedback(form.value, '/')
    }
  }

  const createFields: Ref<Field[]> = ref([
    {
      title: 'Feedback title',
      slug: 'title' as FormKey,
      description: 'Add a short, descriptive headline',
      type: 'text' as InputType,
      rules: [
        (val: string) => hasMinLength(val, 3),
        (val: string) => hasMaxLength(val, 40),
      ],
    },
    {
      title: 'Category',
      slug: 'category' as FormKey,
      description: 'Choose a category for your feedback',
      type: 'select' as InputType,
      rules: [],
    },
    {
      title: 'Details',
      slug: 'description' as FormKey,
      description:
        'Include any specific comments on what should be improved, added, etc.',
      type: 'textarea' as InputType,
      rules: [(val: string) => hasMinLength(val, 10)],
    },
  ])

  const validateFormFields = (newForm: CreateFeedbackForm) => {
    return Object.keys(newForm).forEach((k) => {
      const field = createFields.value.find((f) => f.slug === k)

      if (field) {
        const errorsMessages = field.rules
          ?.map((r) => {
            return r(newForm[k as FormKey])
          })
          .filter((e) => typeof e === 'string')

        errors.value.set(k as FormKey, (errorsMessages?.[0] as string) ?? null)
      }
    })
  }

  watch(
    () => form.value,
    (newValue) => validateFormFields(newValue),
    { deep: true }
  )

  return {
    createFields,
    form,
    setFormField,
    errors,
    submitForm,
    resetForm,
    isValid,
  }
}
