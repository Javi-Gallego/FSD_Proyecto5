import Post from './post.model.js'

export const createPostRepository = async (title, content, userId) => {
    try {
        const post = await Post.create({ title, content, userId })

        return post
    } catch (error) {
        throw new Error("Cant create post")
    }
}