import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async () => {
  /*  const { data, error, count } = await supabase
    .from('feedbacks_with_comments_count')
    .select(feedbackQueryString, { count: 'exact' })
    .order(orderCriterion, { ascending }) */

  const { data, error, count } = await supabase
    .from('categories')
    .select('*', { count: 'exact' })

  // .order('count', { foreignTable: 'comments', ascending: false })

  return {
    count,
    data,
    error,
  }
})
