import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async () => {
  const { data, error, count } = await supabase
    .from('status')
    .select('*', { count: 'exact' })
  return {
    count,
    data,
    error,
  }
})
