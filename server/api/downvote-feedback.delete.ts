import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)

  const { data, error } = await supabase
    .from('upvotes')
    .delete()
    .match({ user: body.user, feedback: body.feedback })

  return {
    data,
    error,
  }
})
