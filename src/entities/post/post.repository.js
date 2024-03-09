import Post from './post.model.js'

export const createPostRepository = async (message, userId) => {
    
    const post = await Post.create({ 
        message, 
        userId })

    return post
}