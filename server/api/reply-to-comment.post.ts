import { commentReplyString } from '~/server/api/query-strings'
import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  const { data, error } = await supabase
    .from('comment_replies')
    .insert(body)
    .select(commentReplyString)

  return {
    data,
    error,
  }
})
