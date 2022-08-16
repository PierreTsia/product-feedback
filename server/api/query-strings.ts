export const feedbackQueryString = `
      id, 
      title,
      description, 
      category (
        id,
        name
      ), 
      upvotes, 
      comments (
        id, 
        content, 
        user (
          id, 
          username,
          name,
          image
        )
      )`
