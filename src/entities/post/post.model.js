import { Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        authorId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        photoUrl: {
            type: String,
            required: false
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
        keyWords: [{
            type: String,
            default: []
        }],
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: []
        }],
        refersTo:{
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: null
        },
        isComment: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false
    }
)

const Post = model("Post", PostSchema)

export default Post