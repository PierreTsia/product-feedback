export const userQueryString = `
          id, 
          username,
          name,
          image`

export const commentQueryString = `
        id, 
        content, 
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
      ) 
      comments (
        ${commentQueryString}
        )
      )`
