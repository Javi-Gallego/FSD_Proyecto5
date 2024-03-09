import User from "../user/user.model.js"

export const emailInUse = async (email) => {

    const user = await User.findOne(
        { email: email }
    )
        
    if (user) {
        throw new Error("Email already in use")
    }
}

export const userNameInUse = async (userName) => {

    const user = await User.findOne(
        { userName: userName }
    )

    if (user) {
        throw new Error("User name already in use")
    }
}

export const createUser = async (userName, email, password) => {

    const newUser = await User.create({
        userName: userName,
        email: email,
        passwordHash: password
    })

    return newUser
}