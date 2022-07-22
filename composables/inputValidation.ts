import { ValidationFn } from '~/composables/types'

export const useInputRules = () => {
  const hasMinLength: ValidationFn = (value: string, min = 3) => {
    return value.length > min || `Must have a minimum of ${min} characters`
  }

  const hasMaxLength: ValidationFn = (value: string, max = 20) => {
    return value.length < max || `Must have less than ${max} characters`
  }

  const isEmail: ValidationFn = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Must be a valid email'
  }

  return { isEmail, hasMaxLength, hasMinLength }
}

export const useInputValidation = () => {
  const { hasMinLength, hasMaxLength, isEmail } = useInputRules()

  const inputRef = ref(null)
  const isFocused = ref(false)
  const hasBeenFocused = ref(false)

  const errorMessages = computed(() => {
    return []
    /*     if (!rules?.length) {
      return []
    }

    return rules.map((r) => r(modelValue)).filter((e) => typeof e === 'string') */
  })

/*   const hasError = computed(() => {
    return !!errorMessages.value.length
  }) */
  const setFocus = (arg = true) => {
    hasBeenFocused.value = true
    isFocused.value = arg
  }
  return {
    hasMinLength,
    hasMaxLength,
    isEmail,
    setFocus,
    inputRef,
    isFocused,
    hasBeenFocused,
    errorMessages,
  }
}
