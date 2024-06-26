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
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                role: "super_admin"
			},
			{
                _id: "65edc842352c4f2a5cf087b3",
				userName: "Admin",
                email: "admin@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                role: "admin"
			},
            {
                _id: "65edc858352c4f2a5cf087b7",
				userName: "User",
                email: "user@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                following: ["65edc873352c4f2a5cf087bb"],
                followers: ["65edc873352c4f2a5cf087bb", "65edcaa0352c4f2a5cf087d7", "65edcaa9352c4f2a5cf087db"]
			},
            {
                _id: "65edc873352c4f2a5cf087bb",
				userName: "Javier",
                email: "javier@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                following: ["65edc887352c4f2a5cf087bf", "65edca3e352c4f2a5cf087c3", "65edca4a352c4f2a5cf087c7", "65edc858352c4f2a5cf087b7"],
                followers: ["65edc887352c4f2a5cf087bf", "65edca3e352c4f2a5cf087c3","65edca4a352c4f2a5cf087c7", "65edc858352c4f2a5cf087b7"],
                photo: "https://rocket-server.up.railway.app/uploads/profile/Javierdragonball.jpg"
			},
            {
                _id: "65edc887352c4f2a5cf087bf",
				userName: "Silvia",
                email: "silvia@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                following: ["65edc873352c4f2a5cf087bb"],
                followers: ["65edc873352c4f2a5cf087bb"],
                photo: "https://rocket-server.up.railway.app/uploads/profile/Silviaardilla.jpg"
			},
            {
                _id: "65edca3e352c4f2a5cf087c3",
				userName: "Raúl",
                email: "raul@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                following: ["65edc873352c4f2a5cf087bb"],
                followers: ["65edc873352c4f2a5cf087bb"],
                photo: "https://rocket-server.up.railway.app/uploads/profile/Raúltirano-saurio-rex.png"
			},
            {
                _id: "65edca4a352c4f2a5cf087c7",
				userName: "Fernando",
                email: "fernando@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                following: ["65edc873352c4f2a5cf087bb"],
                followers: ["65edc873352c4f2a5cf087bb"],
                photo: "https://rocket-server.up.railway.app/uploads/profile/FernandoValenciacf.svg.png"
			},
            {
                _id: "65edca5f352c4f2a5cf087cb",
				userName: "Carlos",
                email: "carlos@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                following: ["65edca6c352c4f2a5cf087cf"],
                followers: ["65edca6c352c4f2a5cf087cf"]
			},
            {
                _id: "65edca6c352c4f2a5cf087cf",
				userName: "Pedro",
                email: "pedro@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                following: ["65edca5f352c4f2a5cf087cb"],
                followers: ["65edca5f352c4f2a5cf087cb"],
                photo: "https://rocket-server.up.railway.app/uploads/profile/Pedrohacker.png"
			},
            {
                _id: "65edca96352c4f2a5cf087d3",
				userName: "Ana",
                email: "ana@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcaa0352c4f2a5cf087d7",
				userName: "Sergio",
                email: "sergio@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                following: ["65edc858352c4f2a5cf087b7"],
                photo: "https://rocket-server.up.railway.app/uploads/profile/Sergiosergio.jpg"
			},
            {
                _id: "65edcaa9352c4f2a5cf087db",
				userName: "Marta",
                email: "marta@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                following: ["65edc858352c4f2a5cf087b7"],
			},
            {
                _id: "65edcab5352c4f2a5cf088df",
				userName: "Ramiro",
                email: "ramiro@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5),
                photo: "https://rocket-server.up.railway.app/uploads/profile/Ramiro_644a8d55-484e-466c-8018-47830eea3775.jpeg"
			},
            {
                _id: "65edcab5352c4f2a5cf0884f",
				userName: "Victor",
                email: "victor@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a5cf0885f",
				userName: "Antonio",
                email: "antonio@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a5cf0886f",
				userName: "Marina",
                email: "marina@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a5cf0887f",
				userName: "Claudia",
                email: "claudia@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a5cf0888f",
				userName: "Paula",
                email: "paula@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a5cf0889f",
				userName: "Fran",
                email: "fran@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a5cf0889a",
				userName: "Troll",
                email: "troll@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a5cf0889b",
				userName: "Niño rata",
                email: "ninyorata@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c3f2a6cf0889b",
				userName: "Batman",
                email: "batman@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a6cf0879b",
				userName: "Jordi",
                email: "jordi@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a6cf0869b",
				userName: "Escritor Frustado",
                email: "escritorfrustrado@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab5352c4f2a6cf0859b",
				userName: "Miguel",
                email: "miguel@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            {
                _id: "65edcab6352c4f2a6cf0859b",
				userName: "Pol",
                email: "pol@gmail.com",
                passwordHash: bcrypt.hashSync('Aa123456', 5)
			},
            // _id: new mongoose.Types.ObjectId("60f3b4e3e3e3e3e3e3e3e3e3")
		])
        
        console.log("-------------------------------------")
		console.log("----- Users created successfully ----")
        console.log("-------------------------------------")
        
        // const post = await Post.create([
        //     {
		// 		authorId: "65edc873352c4f2a5cf087bb",
        //         message: "Este es el primer mensaje de la red social",
        //         likes: [
        //             "65edcab5352c4f2a5cf087df", 
        //             "65edcaa0352c4f2a5cf087d7"
        //         ],
        //         comments: [
        //             { commentatorId: "65edcab5352c4f2a5cf088df", commentary: "Has estado rápido"},
        //             { commentatorId: "65edcab5352c4f2a5cf0889b", commentary: "Menudo logro..."},
        //         ]
		// 	},
        //     {
		// 		authorId: "65edc873352c4f2a5cf087bb",
        //         message: "También voy a escribir el segundo, soy muy rápido",
        //         likes: [
        //             "65edcab5352c4f2a5cf087df", 
        //             "65edcaa0352c4f2a5cf087d7"
        //         ],
        //         comments: [
        //             { commentatorId: "65edcab5352c4f2a5cf0885f", commentary: "Empiezas a ser cansino"},
        //         ]
		// 	},
        //     {
		// 		authorId: "65edca3e352c4f2a5cf087c3",
        //         message: "Esta red social tiene buena pinta, voy a hacer muchos amigos",
        //         likes: [
        //             "65edcab5352c4f2a5cf087df", 
        //             "65edcaa0352c4f2a5cf087d7"
        //         ],
        //         comments: [
        //             { commentatorId: "65edcab5352c4f2a5cf0889a", commentary: "No le pidas a internet lo que no te ha dado la vida real"},
        //             { commentatorId: "65edca5f352c4f2a5cf087cb", commentary: "Cómo se pasa la gente"},
        //         ]
		// 	},
        //     {
		// 		authorId: "65edc887352c4f2a5cf087bf",
        //         message: "Akira Toriyama ha muerto",
        //         likes: [
        //             "65edcab5352c4f2a5cf087df", 
        //             "65edc858352c4f2a5cf087b7"
        //         ],
        //         comments: [
        //             { commentatorId: "65edcaa9352c4f2a5cf087db", commentary: "RIP"},
        //             { commentatorId: "65edca96352c4f2a5cf087d3", commentary: "Siempre se van los mejores"},
        //         ]
		// 	},
        //     {
		// 		authorId: "65edc873352c4f2a5cf087bb",
        //         message: "Si quieres ser un Crypto Bro y hacerte rico con el bitcoin, mándame mensaje privado y te cuento PD1: no es una estafa PD2: Solo aceptamos transferencias a la cuenta de Nigeria que indiquemos"
		// 	},
        //     {
		// 		authorId: "65edc873352c4f2a5cf087bb",
        //         message: "Tened cuidado con el anuncio de las criptomonedas, llevo 4 transferencias hechas y estoy empezando a sospechar... Si te ha gustado dale like y comenta",
        //         comments: [
        //             { commentatorId: "65edcaa0352c4f2a5cf087d7", commentary: "¿En serio?"}
        //         ]
		// 	},
        //     {
		// 		authorId: "65edcab5352c4f2a5cf088df",
        //         message: "¿Alguien sabe dónde pueden quitarme un mal de ojo? No es para mi, es para un amigo...",
        //         likes: [
        //             "65edcab5352c4f2a5cf087df", 
        //             "65edcaa0352c4f2a5cf087d7",
        //             "65edcaa9352c4f2a5cf087db",
        //             "65edc858352c4f2a5cf087b7"
        //         ]
		// 	},
        //     {
		// 		authorId: "65edcab5352c4f2a5cf0889a",
        //         message: "Esta red no vale para nada, me voy a Inkstagram",
        //         likes: [
        //             "65edcab5352c4f2a5cf087df", 
        //             "65edcaa0352c4f2a5cf087d7",
        //             "65edcaa9352c4f2a5cf087db",
        //             "65edc858352c4f2a5cf087b7"
        //         ]
		// 	},
        // ])

        const post = await Post.create([
            {
                _id: "6614291983724e399101d6b9",
				authorId: "65edc873352c4f2a5cf087bb",
                photoUrl: "https://rocket-server.up.railway.app/uploads/profile/Pedrohacker.png",
                message: "Este es el primer mensaje de la red social",
                likes: [
                    "65edcab5352c4f2a5cf087df", 
                    "65edcaa0352c4f2a5cf087d7"
                ],
                comments: [
                    "6614291983724e399101d6c1",
                    "6614291983724e399101d6c2"
                ],
                keyWords: ["primer", "mensaje", "red", "social"]
			},
            {
                _id: "6614291983724e399101d6ba",
				authorId: "65edc873352c4f2a5cf087bb",
                message: "También voy a escribir el segundo, soy muy rápido",
                likes: [
                    "65edcab5352c4f2a5cf087df", 
                    "65edcaa0352c4f2a5cf087d7"
                ],
                comments: [
                    "6614291983724e399101d6c3",
                ],
			},
            {
                _id: "6614291983724e399101d6bb",
				authorId: "65edca3e352c4f2a5cf087c3",
                message: "Esta red social tiene buena pinta, voy a hacer muchos amigos",
                likes: [
                    "65edcab5352c4f2a5cf087df", 
                    "65edcaa0352c4f2a5cf087d7"
                ],
                comments: [
                    "6614291983724e399101d6c4",
                    "6614291983724e399101d6c5"
                ],
			},
            {
                _id: "6614291983724e399101d6bc",
				authorId: "65edc887352c4f2a5cf087bf",
                message: "Akira Toriyama ha muerto",
                likes: [
                    "65edcab5352c4f2a5cf087df", 
                    "65edc858352c4f2a5cf087b7"
                ],
                comments: [
                    "6614291983724e399101d6c6",
                    "6614291983724e399101d6c7"
                ],
			},
            {
                _id: "6614291983724e399101d6bd",
				authorId: "65edcab5352c4f2a5cf0886f",
                message: "Si quieres ser un Crypto Bro y hacerte rico con el bitcoin, mándame mensaje privado y te cuento PD1: no es una estafa PD2: Solo aceptamos transferencias a la cuenta de Nigeria que indiquemos",
                keyWords: ["criptomonedas", "bitcoin"]
			},
            {
                _id: "65edcab5352c4f2a6cf0879b",
				authorId: "65edc873352c4f2a5cf087bb",
                message: "Tened cuidado con el anuncio de las criptomonedas, llevo 4 transferencias hechas y estoy empezando a sospechar... Si te ha gustado dale like y comenta",
                keyWords: ["criptomonedas", "estafa"],
                comments: [
                    "6614291983724e399101d6c8",
                ],
			},
            {
                _id: "6614291983724e399101d6bf",
				authorId: "65edcab5352c4f2a5cf088df",
                message: "¿Alguien sabe dónde pueden quitarme un mal de ojo? No es para mi, es para un amigo...",
                likes: [
                    "65edcab5352c4f2a5cf087df", 
                    "65edcaa0352c4f2a5cf087d7",
                    "65edcaa9352c4f2a5cf087db",
                    "65edc858352c4f2a5cf087b7"
                ]
			},
            {
                _id: "6614291983724e399101d6c0",
				authorId: "65edcab5352c4f2a5cf0889a",
                message: "Esta red no vale para nada, me voy a Inkstagram",
                likes: [
                    "65edcab5352c4f2a5cf087df", 
                    "65edcaa0352c4f2a5cf087d7",
                    "65edcaa9352c4f2a5cf087db",
                    "65edc858352c4f2a5cf087b7"
                ]
			},
            {
                _id: "6614291983724e399101d6c1",
				authorId: "65edcab5352c4f2a5cf088df",
                message: "Has estado rápido",
                isComment: true,
                refersTo: "6614291983724e399101d6b9",
			},
            {
                _id: "6614291983724e399101d6c2",
				authorId: "65edcab5352c4f2a5cf0889b",
                message: "Menudo logro...",
                isComment: true,
                refersTo: "6614291983724e399101d6b9",
			},
            {
                _id: "6614291983724e399101d6c3",
				authorId: "65edcab5352c4f2a5cf0885f",
                message: "Empiezas a ser cansino",
                isComment: true,
                refersTo: "6614291983724e399101d6ba",
			},
            {
                _id: "6614291983724e399101d6c4",
				authorId: "65edcab5352c4f2a5cf0889a",
                message: "No le pidas a internet lo que no te ha dado la vida real",
                isComment: true,
                refersTo: "6614291983724e399101d6bb",
			},
            {
                _id: "6614291983724e399101d6c5",
				authorId: "65edca5f352c4f2a5cf087cb",
                message: "Cómo se pasa la gente",
                isComment: true,
                refersTo: "6614291983724e399101d6bb",
			},
            {
                _id: "6614291983724e399101d6c6",
				authorId: "65edcaa9352c4f2a5cf087db",
                message: "RIP",
                isComment: true,
                refersTo: "6614291983724e399101d6bc",
			},
            {
                _id: "6614291983724e399101d6c7",
				authorId: "65edca96352c4f2a5cf087d3",
                message: "Siempre se van los mejores",
                isComment: true,
                refersTo: "6614291983724e399101d6bc",
			},
            {
                _id: "6614291983724e399101d6c8",
				authorId: "65edcaa0352c4f2a5cf087d7",
                message: "¿En serio?",
                isComment: true,
                refersTo: "6614291983724e399101d6be",
			}
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