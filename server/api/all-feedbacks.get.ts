import uniqBy from 'lodash/uniqBy'
import { OrderDirection } from '~/composables/types'
import { supabase } from '~/server/db/supabase'
import { feedbacksWithCounts } from '~/server/api/query-strings'

export default defineEventHandler(async (event) => {
  const queryParams = useQuery(event)
  const orderCriterion = (queryParams?.orderBy as string) ?? 'comments_count'
  const ascending = queryParams?.direction === OrderDirection.Desc
  const filters = queryParams?.filters ?? null

  let query = supabase
    .from('feedbacks_with_comments_count')
    .select(feedbacksWithCounts)
    .order(orderCriterion, { ascending })

  if (filters) {
    query = query.filter('category', 'in', `(${filters})`)
  }

  const { data, error, count } = await query

  return {
    count,
    data: uniqBy(data, 'id'),
    error,
  }
})
