import Express from "express"
import router from "./routes/router.js"
import cors from "cors"

export const app = Express()

app.use(cors())
//parsea el body
app.use(Express.json())

//API ROUTES

app.get("/API/healthy", (req, res) => {
    res.status(200).json(
        {
            success: true,
            message: "Server is healthy"
        }    
    )
})

app.use("/API", router)