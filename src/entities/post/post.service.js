import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "../../utils/handleError.js";
import {
  createCommentRepository,
  createPostRepository,
  deletePostRepository,
  getAllPostsSuperRepository,
  getAllPostsUserRepository,
  getOwnPostsRepository,
  getPostRepository,
  getPostToRemoveRepository,
  getTimelineRepository,
  searchPostsRepository,
  updatePostRepository,
} from "./post.repository.js";

export const createPostService = async (req) => {
  const message = req.body.message;
  const userId = req.tokenData.userId;
  let photoUrl = "";
  let keyWords = [];

  if (!message) {
    throw new ValidationError("No message to create post");
  }

  if (message.length > 150) {
    throw new ValidationError("Message must contain less than 150 characters");
  }

  if (req.body.photoUrl) {
    photoUrl = req.body.photoUrl;
  }

  if (req.body.keyWords) {
    keyWords = req.body.keyWords.split(" ");
  }
  const posts = await createPostRepository(message, userId, photoUrl, keyWords);

  return posts;
};

export const getAllPostsService = async (req) => {
  console.log("service");
  const userName = req.query.userName || "";
  const skip = req.query.skip || 0;
  const limit = req.query.limit || 20;
  const searcherId = req.tokenData.userId;
  let query = {};
  if (req.query.isComment === "false") {
    query = { isComment: "false" };
  }
  if (req.query.isComment === "true") {
    query = { isComment: "true" };
  }

  if (req.query.search) {
    query.keyWords = { $in: [req.query.search] };
  }

  console.log(" query: ", query);
  if (req.tokenData.roleName === "super_admin") {
    let posts = await getAllPostsSuperRepository(userName, query, skip, limit);
    return posts;
  } else {
    let posts = await getAllPostsUserRepository(
      userName,
      query,
      skip,
      limit,
      searcherId
    );
    console.log("servicedevuelta");
    console.log(posts);
    return posts;
  }
};

export const searchPostsService = async (req) => {
  const posts = await searchPostsRepository(req);

  return posts;
};

export const deletePostService = async (req) => {
  const postId = req.params.id;
  const { userId, roleName } = req.tokenData;

  const post = await getPostToRemoveRepository(postId);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  if (
    post.authorId.toString() === userId.toString() ||
    roleName === "super_admin"
  ) {
    const deletedPost = await deletePostRepository(postId);
    const updatedPost = await getPostRepository(post.refersTo);
    if (updatedPost) {
      updatedPost.comments.pull(postId);
      await updatedPost.save();
    }
    return deletedPost;
  } else {
    throw new ForbiddenError("You do not have permissions to delete this post");
  }
};

export const updatePostService = async (req) => {
  const { postId, message } = req.body;
  const { userId, roleName } = req.tokenData;

  const post = await getPostToRemoveRepository(postId);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  if (
    post.authorId.toString() === userId.toString() ||
    roleName === "super_admin"
  ) {
    const updatedPost = await updatePostRepository(postId, message);

    return updatedPost;
  } else {
    throw new ForbiddenError("You do not have permissions to update this post");
  }
};

export const getOwnPostsService = async (req) => {
  const userId = req.tokenData.userId;

  const posts = await getOwnPostsRepository(userId);

  return posts;
};

export const likePostService = async (req) => {
  const postId = req.params.id;
  const userId = req.tokenData.userId;

  const post = await getPostRepository(postId);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  if (post.authorId.toString() === userId.toString()) {
    throw new ValidationError("You can not like your own post");
  }

  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();

  return post;
};

export const getTimelineService = async (req) => {
  const userId = req.tokenData.userId;

  const posts = await getTimelineRepository(userId);

  return posts;
};

export const commentPostService = async (req) => {
  const postId = req.params.id;
  const userId = req.tokenData.userId;
  const comment = req.body.comment;

  const post = await getPostToRemoveRepository(postId);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  if (!comment) {
    throw new ValidationError("No comment to add");
  }

  post.comments.push({
    commentatorId: userId,
    commentary: comment,
  });

  await post.save();

  return post;
};

export const createCommentService = async (req) => {
  console.log("service");
  const message = req.body.message;
  const userId = req.tokenData.userId;
  const refersTo = req.body.refersTo;
  let photoUrl = "";
  let keyWords = [];

  if (!message) {
    throw new ValidationError("No message to create post");
  }

  if (message.length > 150) {
    throw new ValidationError("Message must contain less than 150 characters");
  }

  if (req.body.photoUrl) {
    photoUrl = req.body.photoUrl;
  }

  if (req.body.keyWords) {
    keyWords = req.body.keyWords.split(" ");
  }
  const posts = await createCommentRepository(
    message,
    userId,
    refersTo,
    photoUrl,
    keyWords
  );
  const updatedPost = await getPostRepository(refersTo);
  if (!updatedPost) {
    throw new NotFoundError("Post not found");
  }
  if (!updatedPost.comments.includes(posts._id)) {
    updatedPost.comments.push(posts._id);
  }
  await updatedPost.save();

  return posts;
};
