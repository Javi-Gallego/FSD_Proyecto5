//importamos dependencias de librerias
import "dotenv/config"
import { dbConnection } from "./database/db.js"
import { app } from "./app.js"

const PORT = process.env.PORT || 4001

dbConnection()
.then( () => {
    console.log("Database connected")

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})

