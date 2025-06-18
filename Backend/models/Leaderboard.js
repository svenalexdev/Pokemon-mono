import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema(
    {
        // optional for signed-in users:
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        username: {
            type: String,
            required: [true, "Username is required"],
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
        isGuest: { type: Boolean, default: true }, // Guests don't have userId
    },
    { timestamps: true }
);

export default model("Leaderboard", leaderboardSchema);

// When saving after fight:

// 1. For signed-in users
// await Leaderboard.findOneAndUpdate(
//     { userId: user._id },
//     {
//         username: user.username,
//         playerPokemon: "Charizard",
//         rivalPokemon: "Blastoise",
//         winningStreak: updatedStreak,
//         isGuest: false,
//     },
//     { upsert: true, new: true } // upsert looks for existing userId=user._id, if found it will update its values, if not it will create a new one
// );

// 2. For guests
// await Leaderboard.create({
//     username: guestInputName, // e.g. name entered from Frontend
//     playerPokemon: 'Pikachu',
//     rivalPokemon: 'Gengar',
//     winningStreak: 1,
//     isGuest: true,
// });

// Leaderboard Component in React exmpl:

// import { useEffect, useState } from "react";

// function Leaderboard() {
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     fetch("/api/leaderboard") // ggf. mit voller URL
//       .then((res) => res.json())
//       .then((data) => setLeaderboard(data))
//       .catch((err) => console.error("Fehler beim Laden:", err));
//   }, []);

//   return (
//     <div className="leaderboard">
//       <h2>🏆 Leaderboard</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Trainer</th>
//             <th>Player Pokémon</th>
//             <th>Rival Pokémon</th>
//             <th>Winning Streak</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leaderboard.map((entry, index) => (
//             <tr key={index}>
//               <td>{entry.username}</td>
//               <td>{entry.playerPokemon}</td>
//               <td>{entry.rivalPokemon}</td>
//               <td>{entry.winningStreak}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Leaderboard;
