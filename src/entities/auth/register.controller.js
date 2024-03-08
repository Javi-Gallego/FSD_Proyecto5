import { handleError } from '../../utils/handleError.js'
import { getRegisterService } from './register.service.js'

export const register = async (req, res) => {
    try {

        const newUser = await getRegisterService(req)

        res.status(201).json({
            success: true,
            message: "User registered succesfully",
            data: newUser
        })
    } catch (error) {
        if (error.message === "Email and password are required" ||
            error.message === "Password must contain between 6 and 10 characters" ||
            error.message === "Email format invalid" ||
            error.message === "Email already in use") {
            return handleError(res, error.message, 400)
        }
        handleError(res, "Cant register user", 500) //500 por defecto en la definicion de la funcion
    }
}
