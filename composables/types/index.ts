import type { Ref } from '@vue/reactivity'

export type InputType = 'text' | 'select' | 'textarea'
export type FormKey = 'title' | 'description' | 'category'

export interface ValidationFn {
  (value: any, args?: any): boolean | string
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

export interface CreateFeedbackForm {
  title: string
  description: string
  category: FeedbackCategory
}

export interface FeedbackComposition {
  createFields: Ref<Field[]>
  form: Ref<CreateFeedbackForm>
  setFormField: (s: FormKey, v: string | FeedbackCategory) => void
  resetForm: () => void
  errors: Ref<FieldErrors>
  submitForm: (feedbackId?: number) => void
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

export enum OrderBy {
  Upvotes = 'upvotes',
  CreatedAt = 'created_at',
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface FeedbackCategory {
  id: number
  name: string
}

export interface StatusesCount {
  status_id: number
  status_name: string
  status_color: string
  status_count: number
  status_description: string
}
