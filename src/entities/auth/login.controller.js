import { handleError } from "../../utils/handleError.js"
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
        if (error.message === "Email and password are required" ||
        error.message === "Password must contain between 6 and 10 characters" ||
        error.message === "Email format is not valid" ||
        error.message === "Email or password invalid") {
        return handleError(res, error.message, 400)
    }
    handleError(res, "Cant log user", 500) //500 por defecto en la definicion de la funcion
    }
}
