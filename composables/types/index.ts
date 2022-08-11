import type { Ref } from '@vue/reactivity'

export type InputType = 'text' | 'select' | 'textarea'
export type FormKey = 'title' | 'details' | 'category'

export interface ValidationFn {
  (value: string, args?: any): boolean | string
}

export interface Field {
  slug: FormKey
  title: string
  description: string
  options?: { id: number; name: string }[]
  type: InputType
  rules?: ValidationFn[]
}

export type FieldErrors = Map<FormKey, string | null>

export interface FeedbackComposition {
  createFields: Ref<Field[]>
  form: Ref<{ [key: string]: string }>
  setFormField: (s: FormKey, v?: string) => void
  resetForm: () => void
  errors: Ref<FieldErrors>
  submitForm: () => void
  isValid: Ref<boolean>
}

export interface Comment {
  id: number
  content: string
  user: User
}

export interface User {
  id: number
  username: string
  name: string
  image: string
}
