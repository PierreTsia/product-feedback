import type { Ref } from '@vue/reactivity'

export type InputType = 'text' | 'select' | 'textarea'
export type FormKey = 'title' | 'description' | 'category' | 'status'

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

export interface FeedbackFormType {
  title: string
  description: string
  category: FeedbackCategory
  status?: any
}

export interface FeedbackComposition {
  allFormFields: Ref<Field[]>
  form: Ref<FeedbackFormType>
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
  comment_replies?: Comment[]
}

export interface User {
  id: number
  username: string
  name: string
  image: string
}

export enum OrderBy {
  Upvotes = 'upvotes_count',
  Comments = 'comments_count',
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
  id: number
  name: string
  color: string
  feedbacks_count: number
  description: string
}

export interface Upvote {
  id: number
  user: { id: number }
}
