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
			{
                _id: "65edc829352c4f2a5cf087af",
				userName: "Super Admin",
                email: "super_admin@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5),
                role: "super_admin"
			},
			{
                _id: "65edc842352c4f2a5cf087b3",
				userName: "Admin",
                email: "admin@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5),
                role: "admin"
			},
            {
                _id: "65edc858352c4f2a5cf087b7",
				userName: "User",
                email: "user@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            {
                _id: "65edc873352c4f2a5cf087bb",
				userName: "Javier",
                email: "javier@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5),
                following: ["65edc887352c4f2a5cf087bf"],
                followers: ["65edc887352c4f2a5cf087bf"]
			},
            {
                _id: "65edc887352c4f2a5cf087bf",
				userName: "Silvia",
                email: "silvia@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5),
                following: ["65edc873352c4f2a5cf087bb"],
                followers: ["65edc873352c4f2a5cf087bb"]
			},
            {
                _id: "65edca3e352c4f2a5cf087c3",
				userName: "Raúl",
                email: "raul@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            {
                _id: "65edca4a352c4f2a5cf087c7",
				userName: "Fernando",
                email: "fernando@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            {
                _id: "65edca5f352c4f2a5cf087cb",
				userName: "Carlos",
                email: "carlos@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            {
                _id: "65edca6c352c4f2a5cf087cf",
				userName: "Pedro",
                email: "pedro@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            {
                _id: "65edca96352c4f2a5cf087d3",
				userName: "Ana",
                email: "ana@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            {
                _id: "65edcaa0352c4f2a5cf087d7",
				userName: "Sergio",
                email: "sergio@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            {
                _id: "65edcaa9352c4f2a5cf087db",
				userName: "Marta",
                email: "marta@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            {
                _id: "65edcab5352c4f2a5cf087df",
				userName: "Ramiro",
                email: "ramiro@gmail.com",
                passwordHash: bcrypt.hashSync('123456', 5)
			},
            // _id: new mongoose.Types.ObjectId("60f3b4e3e3e3e3e3e3e3e3e3")
		])
        
        console.log("-------------------------------------")
		console.log("----- Users created successfully ----")
        console.log("-------------------------------------")
        
        const post = await Post.create([
            {
                _id: "65edcb67352c4f2a5cf087e3",
				authorId: "65edc873352c4f2a5cf087bb",
                message: "Este es el primer mensaje de la red social",
                likes: [
                    "65edcab5352c4f2a5cf087df", 
                    "65edcaa0352c4f2a5cf087d7"
                ],
                comments: [
                    { commentatorId: "65edcab5352c4f2a5cf087df", commentary: "Has estado rápido"},
                    { commentatorId: "65edca6c352c4f2a5cf087cf", commentary: "Menudo logro..."},
                ]
			},
        ])

        console.log("-------------------------------------")
		console.log("----- Posts created successfully ----")
        console.log("-------------------------------------")

	} catch (error) {
		console.log(error)
	} finally {
		mongoose.connection.close()
	}
}

userSeeder()