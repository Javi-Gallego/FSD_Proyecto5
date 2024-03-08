import { Router } from 'express'
import { getUsers } from './user.controller.js'

const router = Router()

router.get("/", getUsers)
// router.get("/profile", profile)
// router.put("/profile", updateProfile)
// router.delete("/:id", deleteUser)
// router.put("/:id/role", updateRole)

export default router