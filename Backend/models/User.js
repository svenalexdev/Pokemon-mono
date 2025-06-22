import { Schema, model } from "mongoose";
import BattleHistory from "./BattleHistory.js";

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

// Middleware: if user is deleted, delete battleHistory too
userSchema.pre("findOneAndDelete", async function (next) {
    const user = await this.model.findOne(this.getFilter());
    if (user) {
        await BattleHistory.deleteOne({ userId: user._id });
    }
    next();
});

export default model("User", userSchema);
