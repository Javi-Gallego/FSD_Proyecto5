import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getUserByMail } from "./login.repository.js"

export const getLoginService = async (req) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
         throw new Error("Email and password are required")
    }

    if (password.length < 6 || password.length > 10) {
        throw new Error("Password must contain between 6 and 10 characters")
    }

    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    
    if (!validEmail.test(email)) {
        throw new Error("Email format is not valid")
    }
    
    const user = await getUserByMail(email)
    
    if(!user){
        throw new Error("Email or password invalid")
    }

    const isValidPassword = bcrypt.compareSync(password, user.passwordHash)

    if(!isValidPassword){
        throw new Error("Email or password invalid")
    }

    const token = jwt.sign(
        {
            userId: user._id,
            roleName: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    )
    
    return token
}