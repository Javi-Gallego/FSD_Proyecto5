import { createPostRepository, deletePostRepository, getAllPostsRepository, getOwnPostsRepository, getPostRepository, updatePostRepository } from "./post.repository.js"

export const createPostService = async (req) => {
    const message = req.body.message
    const userId = req.tokenData.userId

    if (!message) {
        throw new Error("No message to create post")
    }

    const posts = await createPostRepository(message, userId)

    return posts
}

export const getAllPostsService = async (req) => {

    const posts = await getAllPostsRepository()

    return posts
}

export const deletePostService = async (req) => {
        const postId = req.params.id
        const { userId, roleName } = req.tokenData

        const post = await getPostRepository(postId)
        
        if (!post) {
            throw new Error("Post not found")
        }

        if (post.authorId.toString() === userId.toString() || roleName === "super_admin") {
            const deletedPost = await deletePostRepository(postId)
    
            return deletedPost    
        } else {
            throw new Error("You do not have permissions to delete this post")
        } 
        
}

export const updatePostService = async (req) => {
    const { postId, message } = req.body
    const { userId, roleName } = req.tokenData

    const post = await getPostRepository(postId)
    
    if (!post) {
        throw new Error("Post not found")
    }

    if (post.authorId.toString() === userId.toString() || roleName === "super_admin") {
        const updatedPost = await updatePostRepository(postId, message)

        return updatedPost    
    } else {
        throw new Error("You do not have permissions to update this post")
    } 
    
}

export const getOwnPostsService = async (req) => {
    const userId = req.tokenData.userId

    const posts = await getOwnPostsRepository(userId)

    return posts
}