import Post from './post.model.js'
import User from '../user/user.model.js'

export const createPostRepository = async (message, userId) => {
    
    const post = await Post.create({ 
        message: message, 
        authorId: userId })

    return post
}

export const getAllPostsRepository = async () => {

    const posts = await Post.find()
                            .populate("authorId", "userName -_id")
                            .populate("likes", "userName -_id")
                            .select("-createdAt -updatedAt")

    return posts
}

export const deletePostRepository = async (postId) => {
    const deletedPost = await Post.findByIdAndDelete(postId)

    return deletedPost
}

export const getPostRepository = async (postId) => {

    const post = await Post.findById(postId)

    return post
}

export const updatePostRepository = async (postId, message) => {
    const updatedPost = await Post.updateOne(
        { _id: postId },
        { $set: { message: message } },
        { new: true })

    return updatedPost
}

export const getOwnPostsRepository = async (userId) => {
    const posts = await Post.find({ authorId: userId })
                            .populate("authorId", "userName -_id")
                            .populate("likes", "userName -_id")
                            .select("-createdAt -updatedAt")

    return posts
}

export const getTimelineRepository = async (userId) => {
    const user = await User.findById(userId)

    const following = user.following

    const timeline = await Post.find({ authorId: { $in: following } })

    return timeline
}