import Post from "./post.model.js";
import User from "../user/user.model.js";
import { model } from "mongoose";
import { follow } from "../user/user.controller.js";

export const createPostRepository = async (
  message,
  userId,
  photoUrl,
  keyWords
) => {
  const post = await Post.create({
    message: message,
    authorId: userId,
    photoUrl: photoUrl,
    keyWords: keyWords,
  });

  return post;
};

export const getAllPostsUserRepository = async (
  userName,
  query,
  skip,
  limit,
  searcherId
) => {
  try {
    console.log("repository");
  let posts = await Post.find(query)
  .populate({
    path: "authorId",
    match: {
      $and: [
        { userName: userName },
        {
          $or: [
            { privacy: "public" },
            { privacy: "private", following: searcherId }
          ]
        }
      ]
    },
    model: User
  })
    .populate("likes", "userName _id")
    .populate("comments", "authorId _id photoUrl message likes comments")
    .select("-updatedAt")
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);
  posts = posts.filter((post) => post.authorId !== null);
  console.log("postfilter");
  console.log(posts);
  return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
  
};

export const getAllPostsSuperRepository = async (
  userName,
  query,
  skip,
  limit
) => {
  const posts = await Post.find(query)
    .populate({
      path: "authorId",
      match: { userName: userName },
      model: User,
    })
    .populate("likes", "userName _id")
    .populate("comments", "authorId _id photoUrl message likes comments")
    .select("-updatedAt")
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);

    posts = posts.filter((post) => post.isComment !== false);

  return posts;
};

export const searchPostsRepository = async (req) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "users", // nombre de la colección de usuarios
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
    {
      $match: {
        "author.userName": {
          $regex: new RegExp(searchCriteria),
          $options: "i",
        },
      },
    },
  ]);

  return posts;
};

export const deletePostRepository = async (postId) => {
  const deletedPost = await Post.findByIdAndDelete(postId);

  return deletedPost;
};

export const getPostRepository = async (postId) => {
  const post = await Post.findById(postId)
    .populate("authorId", "userName _id")
    .populate("comments.commentatorId", "userName _id")
    .select("-createdAt -updatedAt");

  return post;
};

export const updatePostRepository = async (postId, message) => {
  const updatedPost = await Post.updateOne(
    { _id: postId },
    { $set: { message: message } },
    { new: true }
  );

  return updatedPost;
};

export const getOwnPostsRepository = async (userId) => {
  const posts = await Post.find({ authorId: userId })
    .populate("authorId", "userName photo -_id")
    .populate("likes", "userName _id")
    .populate({
      path: "comments",
      model: "Post",
      populate: {
        path: "authorId",
        model: "User",
        select: "userName photo _id",
      },
    });

  return posts;
};

export const getTimelineRepository = async (userId) => {
  const user = await User.findById(userId);

  const following = user.following;

  const timeline = await Post.find({
    authorId: { $in: following },
    isComment: false,
  })
    .populate("authorId", "userName photo _id")
    .populate("likes", "userName _id")
    .populate("comments", "userName photo -_id");

  return timeline;
};

export const getPostToRemoveRepository = async (postId) => {
  const post = await Post.findById(postId).select("-createdAt -updatedAt");

  return post;
};

export const createCommentRepository = async (
  message,
  userId,
  refersTo,
  photoUrl,
  keyWords
) => {
  console.log("repository");
  const post = await Post.create({
    message: message,
    authorId: userId,
    isComment: true,
    refersTo: refersTo,
    photoUrl: photoUrl,
    keyWords: keyWords,
  });

  return post;
};

export const getMostLikedPostsRepository = async () => {
  console.log("repository");
  const posts = await Post.aggregate([
    {
      $addFields: {
        likesCount: { $size: "$likes" },
      },
    },
    {
      $sort: { likesCount: -1 },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "users", 
        localField: "authorId", 
        foreignField: "_id", 
        as: "authorId"
      },
    },
    {
      $unwind: "$authorId"
    },
    {
      $project: { 
        "authorId.userName": 1,
        "authorId.photo": 1,
        _id: 1,
        likes: 1,
        message: 1,
        following: 1,
        followers: 1,
      }
    }
  ]);

  return posts;
};
