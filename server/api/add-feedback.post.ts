import { supabase } from '~/server/db/supabase'
// import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const { details, ...rest } = body
  const payload = { ...rest, description: details }

  const { data, error } = await supabase.from('feedbacks').insert(payload)
  if (error) {
    throw new Error(error.message)
  }

  return {
    data,
  }
})
