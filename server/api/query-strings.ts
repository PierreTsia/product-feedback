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
      upvotes,
      status (
        id,
        name
      ), 
      comments (
        ${commentQueryString}
      )
     
      `
