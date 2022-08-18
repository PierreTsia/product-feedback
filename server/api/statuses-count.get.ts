import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async () => {
  const { data, error, count } = await supabase
    .from('statuses_count')
    .select('*', { count: 'exact' })

  return {
    count,
    data,
    error,
  }
})
