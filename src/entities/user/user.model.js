import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["super_admin", "user"],
            default: "user"
        },
        following: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }],
        followers: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            default: []
        }],
        is_active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false
    }
)

const User = model("User", UserSchema)

export default User