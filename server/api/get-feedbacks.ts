import { currentUser } from './../data/data.json'
import { supabase } from '~/server/db/supabase'

const feedbackQueryString = `
      id, 
      title, 
      category (
        name
      ), 
      upvotes, 
      comments (
        id, 
        content, 
        user (
          id, 
          username
        )
      )`

export default defineEventHandler(async () => {

  const { data } = await supabase
    .from('feedbacks')
    .select(feedbackQueryString)
    .limit(20)

  return {
    currentUser,
    productRequests: data,

  }
})
