import Post from './post.model.js'

export const createPostRepository = async (message, userId) => {
    
    const post = await Post.create({ 
        message: message, 
        authorId: userId })

    return post
}

export const getAllPostsRepository = async () => {

    const posts = await Post.find()
                            .populate("authorId", "userName -_id")
                            .select("-createdAt -updatedAt")

    return posts
}