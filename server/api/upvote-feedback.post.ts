import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  const { data, error } = await supabase
    .from('upvotes')
    .insert(body)
    .select('*')

  return {
    data,
    error,
  }
})
