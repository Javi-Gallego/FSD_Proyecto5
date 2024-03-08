
import { Router } from 'express'
import authRoutes from "../entities/auth/auth.routes.js"
import userRoutes from "../entities/user/user.routes.js"
import postRoutes from "../entities/post/post.routes.js"

const router = Router()

router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/posts", postRoutes)

export default router