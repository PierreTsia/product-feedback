import { feedbackQueryString } from '~/server/api/query-strings'
import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async () => {
  const { data, error } = await supabase
    .from('feedbacks')
    .select(feedbackQueryString)
    .limit(20)

  return {
    data,
    error,
  }
})
