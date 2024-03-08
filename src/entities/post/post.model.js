import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        message: {
            type: String,
            required: false
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }]
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false
    }
)

const User = model("Post", UserSchema)

export default User