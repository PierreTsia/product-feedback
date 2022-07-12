export interface ValidationFn {
  (value: string, args?: any): boolean | string
}

export const useInputValidation = () => {
  const hasMinLength: ValidationFn = (value: string, min = 3) => {
    return value.length > min || `Must have a minimum of ${min} characters`
  }

  const hasMaxLength: ValidationFn = (value: string, max = 20) => {
    return value.length < max || `Must have less than ${max} characters`
  }

  const isEmail: ValidationFn = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Must be a valid email'
  }
  return { hasMinLength, hasMaxLength, isEmail }
}
