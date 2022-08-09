import type { Ref } from '@vue/reactivity'

import { useInputRules } from '~/composables/inputValidation'
import type {
  FeedbackComposition,
  Field,
  FieldErrors,
  FormKey,
  InputType,
} from '~/composables/types'
import { useFeedbackStore } from '~/store/feedback.store'

const categories = computed(() =>
  ['Feature', 'Ui', 'Ux', 'Enhancement', 'Bug'].map((name, i) => ({
    id: i,
    name,
  }))
)

export const useFeedbackForm = (): FeedbackComposition => {
  const { addFeedback } = useFeedbackStore()
  const { hasMinLength, hasMaxLength } = useInputRules()

  const form = ref({
    title: '',
    category: '',
    details: '',
  })

  const setFormField = (slug: FormKey, value = '') => {
    form.value[slug] = value
  }

  const resetForm = () => {
    form.value = {
      title: '',
      category: '',
      details: '',
    }
  }

  const errors: Ref<FieldErrors> = ref(
    new Map([
      ['title' as FormKey, null],
      ['description' as FormKey, null],
      ['category' as FormKey, null],
      ['details' as FormKey, null],
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

  const submitForm = async () => {
    if (!isValid.value) {
      return
    }
    await addFeedback(form.value, '/')
  }

  const createFields: Ref<Field[]> = ref([
    {
      title: 'Feedback title',
      slug: 'title' as FormKey,
      description: 'Add a short, descriptive headline',
      type: 'text' as InputType,
      rules: [
        (val: string) => hasMinLength(val, 3),
        (val: string) => hasMaxLength(val, 20),
      ],
    },
    {
      title: 'Category',
      slug: 'category' as FormKey,
      description: 'Choose a category for your feedback',
      options: categories.value,
      type: 'select' as InputType,
      rules: [],
    },
    {
      title: 'Details',
      slug: 'details' as FormKey,
      description:
        'Include any specific comments on what should be improved, added, etc.',
      type: 'textarea' as InputType,
      rules: [(val: string) => hasMinLength(val, 10)],
    },
  ])

  const validateFormFields = (newForm: { [key: string]: string }) => {
    return Object.keys(newForm).forEach((k) => {
      const field = createFields.value.find((f) => f.slug === k)

      if (field) {
        const errorsMessages = field.rules
          ?.map((r) => r(newForm[k as FormKey]))
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
