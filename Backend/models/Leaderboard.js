import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema(
    {
        trainerName: {
            type: String,
            required: [true, "Trainer name is required"],
        },
        playerPokemon: {
            type: String,
            required: [true, "Player Pokemon is required"],
        },
        rivalPokemon: {
            type: String,
            required: [true, "Rival Pokemon is required"],
        },
        winningStreak: {
            type: Number,
            required: [true, "Winning streak is required"],
        },
    },
    { timestamps: true }
);

export default model("Leaderboard", leaderboardSchema);
