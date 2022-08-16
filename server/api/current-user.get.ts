import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async () => {
  const CURRENT_USER_ID = 3

  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', CURRENT_USER_ID)
    .single()

  return {
    data,
    error,
  }
})
