import bcrypt from "bcrypt"
import { createUser, emailInUse, userNameInUse } from "./register.repository.js"

export const getRegisterService = async (req) => {

    const { userName, email, password } = req.body

    if (!email || !password || !userName) {
        throw new Error("User name, email and password are required")
    }

    if (userName.length < 3 || userName.length > 10) {
        throw new Error("User name must contain between 3 and 10 characters")
    }
    
    if (password.length < 6 || password.length > 10) {
        throw new Error("Password must contain between 6 and 10 characters")
    }

    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    if (!validEmail.test(email)) {
        throw new Error("Email format invalid")
    }

    const userNameUsed = await userNameInUse(userName)
    
    const emailUsed = await emailInUse(email) 

    const passwordEncrypted = bcrypt.hashSync(password, 5)

    const newUser = await createUser(userName, email, passwordEncrypted)

    return newUser
}