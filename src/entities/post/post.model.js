import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        authorId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        message: {
            type: String,
            required: true
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