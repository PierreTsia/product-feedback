import { feedbackQueryString } from '~/server/api/query-strings'
import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase
    .from('feedbacks')
    .select(feedbackQueryString)
    .eq('id', event.context.params.id)

  return { data, error }
})
