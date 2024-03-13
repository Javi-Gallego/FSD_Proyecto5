import { ValidationError, handleError } from "../../utils/handleError.js"
import { getLoginService } from "./login.service.js"

export const login = async (req, res) => {
    try {
        const token = await getLoginService(req)

        res.status(200).json({
            success: true,
            message: "User logged succesfully",
            token: token
        })

    } catch (error) {
        if (error instanceof ValidationError) {
            return handleError(res, error.message, error.status, error.name)
        }
        handleError(res, "Cant log user", 500, "") //500 por defecto en la definicion de la funcion
    }
}
