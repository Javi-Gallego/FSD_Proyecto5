import { Router } from 'express'
import { getProfile, getUsers, updateProfile } from './user.controller.js'
import { auth } from '../../core/auth.js'
import { isSuperAdmin } from '../../core/isSuperAdmin.js'


const router = Router()

router.get("/", auth, getUsers)
router.get("/profile", auth, getProfile)
router.put("/profile", auth, updateProfile)
// router.delete("/:id", deleteUser)
// router.put("/:id/role", updateRole)

export default router