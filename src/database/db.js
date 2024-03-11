
import mongoose from "mongoose"

export const dbConnection = async () => {
    return await mongoose.connect(
        process.env.MONGO_URI, 
        {}
    )
}