import { z } from "zod/v4";

const userSchema = z.object({
    username: z.string().min(2, "Username is required").max(30),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const signInSchema = userSchema.omit({ email: true });

const leaderboardSchema = z.object({
    userId: z.string().min(1).optional(),
    username: z.string().min(2, "Username is required").max(30),
    playerPokemon: z.string().min(1, "Player Pokemon is required"),
    winningStreak: z.number().int().min(0, "Winning streak must be 0 or more"),
    rivalPokemon: z.string().min(1, "Rival Pokemon is required"),
    isGuest: z.boolean(),
});

const battleHistorySchema = z.object({
    userId: z.string().min(1),
    totalBattles: z.number().int().min(0),
    battlesWon: z.number().int().min(0),
    battlesLost: z.number().int().min(0),
    bestStreak: z.number().int().min(0),
    bestBrawler: z.string().min(1, "Best Pokemon is required"),
});

export { userSchema, leaderboardSchema, battleHistorySchema, signInSchema };
