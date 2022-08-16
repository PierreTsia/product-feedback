import { OrderDirection } from '~/composables/types'
import { feedbackQueryString } from '~/server/api/query-strings'
import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async (event) => {
  const queryParams = useQuery(event)
  const orderCriterion = (queryParams?.orderBy as string) ?? 'created_at'
  const ascending = queryParams?.direction === OrderDirection.Asc
  const filters = queryParams?.filters ?? null

  let query = supabase
    .from('feedbacks')
    .select(feedbackQueryString, { count: 'exact' })
    .order(orderCriterion, { ascending })

  if (filters) {
    query = query.filter('category', 'in', `(${filters})`)
  }

  const { data, error, count } = await query

  return {
    count,
    data,
    error,
  }
})
