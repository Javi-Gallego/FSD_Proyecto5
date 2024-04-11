import { Router } from 'express'
import { auth } from '../../core/auth.js'
import { isSuperAdmin } from '../../core/isSuperAdmin.js'
import { createComment, createPost, deletePost, getAllPosts, getOwnPosts, getTimeline, likePost, searchPosts, updatePost } from './post.controller.js'

const router = Router()

router.post("/", auth, createPost)
router.delete("/:id", auth, deletePost)
router.put("/", auth, updatePost)
router.get("/own", auth, getOwnPosts)
router.get("/", auth, getAllPosts)
router.get("/", auth, searchPosts)
router.put("/like/:id", auth, likePost)
router.get("/timeline", auth, getTimeline)
router.post("/comment", auth, createComment)

export default router