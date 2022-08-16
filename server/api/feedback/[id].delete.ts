import { supabase } from '~/server/db/supabase'

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase
    .from('feedbacks')
    .delete()
    .match({ id: event.context.params.id })

  return { data, error }
})
