import { z } from "zod/v4";

const userSchema = z.object({
    username: z.string().min(2, "Username is required").max(30),
    email: z.email("Invalid Email"),
    password: z.string().min(8),
});

const leaderboardSchema = z.object({
    userId: z.string().min(1).optional(),
    username: z.string().min(2, "Username is required").max(30),
    playerPokemon: z.string().min(1, "Player Pokemon is required"),
    rivalPokemon: z.string().min(1, "Rival Pokemon is required"),
    winningStreak: z.number().int().min(),
    isGuest: z.boolean(),
});

