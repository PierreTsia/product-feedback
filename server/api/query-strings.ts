export const feedbackQueryString = `
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
