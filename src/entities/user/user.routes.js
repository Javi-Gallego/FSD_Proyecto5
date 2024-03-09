import { Router } from 'express'
import { getProfile, getUsers } from './user.controller.js'
import { auth } from '../../core/auth.js'
import { isSuperAdmin } from '../../core/isSuperAdmin.js'

const router = Router()

router.get("/", auth, isSuperAdmin, getUsers)
router.get("/profile", auth, getProfile)
// router.put("/profile", updateProfile)
// router.delete("/:id", deleteUser)
// router.put("/:id/role", updateRole)

export default router