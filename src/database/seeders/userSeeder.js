import User from "../../entities/user/user.model.js"
import Post from "../../entities/post/post.model.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { dbConnection } from "../db.js"
import "dotenv/config"

export const userSeeder = async () => {
	try {
		dbConnection()
		console.log("Connected to MongoDB")

		const user = await User.create([
			// {
			// 	userName: "Super Admin",
            //     email: "super_admin@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5),
            //     role: "super_admin"
			// },
			// {
			// 	userName: "Admin",
            //     email: "admin@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5),
            //     role: "admin"
			// },
            // {
			// 	userName: "User",
            //     email: "user@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Javier",
            //     email: "javier@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Silvia",
            //     email: "silvia@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Raúl",
            //     email: "raul@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Fernando",
            //     email: "fernando@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Carlos",
            //     email: "carlos@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Pedro",
            //     email: "pedro@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Ana",
            //     email: "ana@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Sergio",
            //     email: "sergio@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Marta",
            //     email: "marta@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            // {
			// 	userName: "Ramiro",
            //     email: "ramiro@gmail.com",
            //     passwordHash: bcrypt.hashSync('123456', 5)
			// },
            {
            	userName: "Niño Rata",
                email: "ninorata@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            // _id: new mongoose.Types.ObjectId("60f3b4e3e3e3e3e3e3e3e3e3")
		])
        
        console.log("-------------------------------------")
		console.log("----- Users created successfully ----")
        console.log("-------------------------------------")
	} catch (error) {
		console.log(error)
	} finally {
		mongoose.connection.close()
	}
}

userSeeder()