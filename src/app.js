import Express from "express"
import router from "./routes/router.js"

export const app = Express()

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