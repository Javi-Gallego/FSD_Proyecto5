import User from "../user/user.model.js"

export const emailInUse = async (email) => {
    const user = await User.findOne(
        { email: email }
    )

    if (user) {
        throw new Error("Email already in use")
    }
}

export const createUser = async (userName, email, password) => {

    const newUser = await User.create({
        userName,
        email,
        password
    })

    return newUser
}