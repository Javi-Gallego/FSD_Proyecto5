import { Router } from 'express'
import { auth } from '../../core/auth.js'
import { isSuperAdmin } from '../../core/isSuperAdmin.js'
import { commentPost, createPost, deletePost, getAllPosts, getOwnPosts, getTimeline, likePost, updatePost } from './post.controller.js'

const router = Router()

router.post("/", auth, createPost)
router.delete("/:id", auth, deletePost)
router.put("/", auth, updatePost)
router.get("/own", auth, getOwnPosts)
router.get("/", auth, isSuperAdmin, getAllPosts)
router.put("/like/:id", auth, likePost)
router.get("/timeline", auth, getTimeline)
router.put("/comment/:id", auth, commentPost)

export default router