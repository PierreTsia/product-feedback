export const userQueryString = `
        user (
          id, 
          username,
          name,
          image
         )
         `

export const commentQueryString = `
      comments (
        id, 
        content,
        comment_replies (
          id,
          content,
          ${userQueryString}
        ), 
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
       ${commentQueryString}

     
      `
