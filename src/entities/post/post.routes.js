import { Router } from 'express'
import { createPost } from './post.controller.js'

const router = Router()

router.post("/", createPost)
// router.delete("/:id", deletePost)
// router.put("/", updatePostById)
// router.get("/own", getOwnPosts)
// router.get("/:id", getPosts)
// router.put("/like/:id", likePost)

export default router