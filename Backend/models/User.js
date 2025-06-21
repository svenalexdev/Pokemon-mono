import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            minLength: [2, "Minimum length is 2 characters"],
            maxLength: [30, "Maximum length is 20 characters"],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be at least 8 characters long"],
            select: false,
        },
    },
    { timestamps: true }
);

export default model("User", userSchema);
