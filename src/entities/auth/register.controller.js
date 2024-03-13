import { ValidationError, handleError } from '../../utils/handleError.js'
import { getRegisterService } from './register.service.js'

export const register = async (req, res) => {
    try {

        const newUser = await getRegisterService(req)
        console.log("newUser: " +  newUser._id)
        res.status(201).json({
            success: true,
            message: "User registered succesfully",
            data: newUser,
            id: newUser._id
        })

    } catch (error) {
        if (error instanceof ValidationError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Cant register user", 500, "") //500 por defecto en la definicion de la funcion
    }
}
