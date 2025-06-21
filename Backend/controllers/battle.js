import Leaderboard from "../models/Leaderboard.js";
import BattleHistory from "../models/BattleHistory.js";

// Seperate controller function to save data after fights:
// - leaderboard: for all players (guest & signed-in)
// - battle history: only for signed-in

const submitBattleResult = async (req, res) => {
    const {
        userId,
        isGuest,
        username,
        playerPokemon,
        rivalPokemon,
        didWin,
        winningStreak,
        bestBrawler,
    } = req.body;

    try {
        // 1. Save leaderboard entry
        await Leaderboard.create({
            userId: isGuest ? null : userId,
            username,
            playerPokemon,
            winningStreak,
            rivalPokemon,
            isGuest,
        });

        // 2. Update battle history only for signed-in users
        if (!isGuest && userId) {
            const history = await BattleHistory.findOne({ userId });

            if (history) {
                history.totalBattles += 1;
                if (didWin) {
                    history.battlesWon += 1;
                } else {
                    history.battlesLost += 1;
                }

                // update bestStreak and bestBrawler
                if (winningStreak > history.bestStreak) {
                    history.bestStreak = winningStreak;
                    history.bestBrawler = bestBrawler;
                }

                await history.save();
            } else {
                // in case no history exists, create it
                await BattleHistory.create({
                    userId,
                    totalBattles: 1,
                    battlesWon: didWin ? 1 : 0,
                    battlesLost: didWin ? 0 : 1,
                    bestStreak: winningStreak,
                    bestBrawler,
                });
            }
        }

        return res.status(200).json({ message: "Brawl result saved" });
    } catch (error) {
        console.error("Error saving brawl result", error);
        return res.status(500).json({ error: "Saving brawl result failed" });
    }
};

// Send API call from frontend after fight ends

export default submitBattleResult;
