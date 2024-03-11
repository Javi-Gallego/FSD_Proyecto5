import { Schema, model } from "mongoose";

const PostSchema = new Schema(
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

const Post = model("Post", PostSchema)

export default Post