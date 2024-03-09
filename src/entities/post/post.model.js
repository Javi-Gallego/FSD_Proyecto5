import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        authorId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String,
            required: false
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }],
        comments: [{
            commentatorId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            commentary: {
                type: String,
            }
        }],
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false
    }
)

const User = model("Post", UserSchema)

export default User