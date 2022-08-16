import { OrderDirection } from '~/composables/types'
import { feedbackQueryString } from '~/server/api/query-strings'
import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const orderCriterion = (query?.orderBy as string) ?? 'created_at'
  const ascending = query?.direction === OrderDirection.Asc

  /*  const { data, error, count } = await supabase
    .from('feedbacks_with_comments_count')
    .select(feedbackQueryString, { count: 'exact' })
    .order(orderCriterion, { ascending }) */

  const { data, error, count } = await supabase
    .from('feedbacks')
    .select(feedbackQueryString, { count: 'exact' })
    .limit(10)
    .order(orderCriterion, { ascending })
  // .order('count', { foreignTable: 'comments', ascending: false })

  return {
    count,
    data,
    error,
  }
})
