import { Router } from 'express'
import { auth } from '../../core/auth.js'
import { isSuperAdmin } from '../../core/isSuperAdmin.js'
import { createPost, deletePost, getAllPosts } from './post.controller.js'

const router = Router()

router.post("/", auth, createPost)
router.delete("/:id", auth, deletePost) //crashea al lanzar errores
// router.put("/", updatePostById)
// router.get("/own", getOwnPosts)
router.get("/", auth, isSuperAdmin, getAllPosts)
// router.put("/like/:id", likePost)

export default router