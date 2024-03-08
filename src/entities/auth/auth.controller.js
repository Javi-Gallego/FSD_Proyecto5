import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'
import { handleError } from '../../utils/handleError.js'

export const register = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (password.length < 6 || password.length > 10) {
            // throw new Error("Password must contain between 6 and 10 characters")
            return res.status(400).json({
                success: false,
                message: "Password must contain between 6 and 10 characters"
            })
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

        if (!validEmail.test(email)) {
            // throw new Error("Email format invalid")
            return res.status(400).json({
                    success: false,
                    message: "Email format invalid"
            })
        }

        const passwordEncrypted = bcrypt.hashSync(password, 5)

        const newUser = await User.create({
            email: email,
            password: passwordEncrypted       
        })

        res.status(201).json({
            success: true,
            message: "User registered succesfully",
            data: newUser
        })
    } catch (error) {
        res.status(500).json({
              success: false,
              message: "User cant be registered",
              error: error.message
        })
        // if (error.message === "Password must contain between 6 and 10 characters" ||
        //     error.message === "Email format invalid") {
        //     handleError(res, error.message, 400)
        // }
        // handleError(res, "Cant register user") //500 por defecto en la definicion de la funcion
    }
}

export const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are mandatories"
            })
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validEmail.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Email format is not valid"
            })
        }
                //   |  DE MANERA TEMPORAL SE INCLUYE ANY AL NO PODER DELCARARSE USER EN LA VERIFICACION DE CONTRASEÑA
        const user = await User.findOne(
            {
                email: email
            }
        )

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

        const isValidPassword = bcrypt.compareSync(password, user.password)

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Email or password invalid"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                roleName: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )

        res.status(200).json({
            success: true,
            message: "User logged succesfully",
            token: token //MOSTRAMOS EL TOKEN DE MANERA TEMPORAL PARA PODER PROBAR CON ÉL OTRA FUNCIONALIDADES
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "User cant be logged",
            error: error
        })
    }
}