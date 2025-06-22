import { Schema, model } from "mongoose";

const battleHistorySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // username: {
        //     type: String,
        //     required: [true, "Username is required"],
        //     minLength: [2, "Minimum length is 2 characters"],
        //     maxLength: [30, "Maximum length is 20 characters"],
        //     unique: true,
        // },
        totalBattles: {
            type: Number,
            default: 0,
        },
        battlesWon: {
            type: Number,
            default: 0,
        },
        battlesLost: {
            type: Number,
            default: 0,
        },
        bestStreak: {
            type: Number,
            required: [true, "Winning streak is required"],
            default: 0,
        },
        bestBrawler: {
            type: String,
            required: false,
            default: "",
        },
    },
    { timestamps: true }
);

export default model("BattleHistory", battleHistorySchema);
