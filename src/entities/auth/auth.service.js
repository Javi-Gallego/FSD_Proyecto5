import bcrypt from "bcrypt"
import User from "../user/user.model.js"
import { createUser, emailInUse } from "./auth.repository.js"

export const getAuthService = async (req) => {

    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        throw new Error("Email and password are required")
    }
    if (password.length < 6 || password.length > 10) {
        throw new Error("Password must contain between 6 and 10 characters")
    }

    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    if (!validEmail.test(email)) {
        throw new Error("Email format invalid")
    }

    const emailUsed = await emailInUse(email) 

    const passwordEncrypted = bcrypt.hashSync(password, 5)

    const newUser = await createUser(email, passwordEncrypted)

    return newUser
}