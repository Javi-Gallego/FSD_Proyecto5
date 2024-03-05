//importamos dependencias de librerias
import express from "express"
import "dotenv/config"

const app = express()

//parsea el body
app.use(express.json())

const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})