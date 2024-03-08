
import { Router } from 'express'
import { register } from './register.controller.js'
import { login } from './login.controller.js'

const router = Router()

router.post("/register", register)
router.post("/login", login)

export default router