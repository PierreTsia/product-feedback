import { feedbackQueryString } from '~/server/api/query-strings'
import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)


  const { data, error } = await supabase
    .from('feedbacks')
    .insert(body)
    .select(feedbackQueryString)

  return {
    data,
    error,
  }
})
