import { createPostRepository, deletePostRepository, getAllPostsRepository, getPostRepository } from "./post.repository.js"

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