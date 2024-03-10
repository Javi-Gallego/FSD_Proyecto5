import { Router } from 'express'
import { deleteUser, follow, getProfile, getUsers, updateProfile, updateRole } from './user.controller.js'
import { auth } from '../../core/auth.js'
import { isSuperAdmin } from '../../core/isSuperAdmin.js'


const router = Router()

router.get("/", auth, getUsers)
router.get("/profile", auth, getProfile)
router.put("/profile", auth, updateProfile)
router.delete("/:id", auth, isSuperAdmin, deleteUser)
router.put("/:id/role", auth, isSuperAdmin, updateRole)
router.put("/follow/:id", auth, follow)

export default router