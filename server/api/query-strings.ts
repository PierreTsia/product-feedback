export const feedbacksWithCounts = `
  comments_count,
  upvotes_count,
  created_at,
  title, 
  id,
  description,
  category (
    id,
    name
  ),
  upvotes (
    id,
    user (
      id
    )
  ),
  comments (
    id, 
    content
  )`

export const userQueryString = `
          id, 
          username,
          name,
          image`

export const commentReplyString = `
          id,
          content,
          user (
            ${userQueryString}
          )
`
export const commentQueryString = `
        id, 
        content,
        comment_replies (
          ${commentReplyString}
        ), 
        user (
         ${userQueryString}
        )`

export const feedbackQueryString = `
      id, 
      title,
      description, 
      category (
        id,
        name
      ), 
      upvotes_old,
      status (
        id,
        name
      ), 
      comments (
        ${commentQueryString}
      ),
      upvotes (
        id,
        user (
          id
        )
      )
     
      `
