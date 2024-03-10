import User from "../../entities/user/user.model.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { dbConnection } from "../db.js"

const userSeeder = async () => {
	try {
		const connect = await dbConnection()
		console.log("Connected to MongoDB")

		const user = await User.create([
			{
				userName: "Super Admin",
                email: "super_admin@gmail.com",
                password: bcrypt.hashSync('123456', 5),
                role: "super_admin"
			},
			{
				userName: "Admin",
                email: "admin@gmail.com",
                password: bcrypt.hashSync('123456', 5),
                role: "admin"
			},
            {
				userName: "User",
                email: "user@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Javier",
                email: "javier@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Silvia",
                email: "silvia@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Raúl",
                email: "raul@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Fernando",
                email: "fernando@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Carlos",
                email: "carlos@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Pedro",
                email: "pedro@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Ana",
                email: "ana@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Sergio",
                email: "sergio@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Marta",
                email: "marta@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},
            {
				userName: "Ramiro",
                email: "ramiro@gmail.com",
                password: bcrypt.hashSync('123456', 5)
			},

		])

        console.log("-------------------------------------")
		console.log("----- Users created successfully ----")
        console.log("-------------------------------------")
	} catch (error) {
		console.log(error)
	} finally {
		mongoose.disconnect()
	}
}

userSeeder()