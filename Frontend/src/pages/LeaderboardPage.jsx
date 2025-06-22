import { useState, useEffect } from 'react';

function LeaderboardPage() {
  const leaderboardData = [
    {
      position: 1,
      player: 'Ash',
      pokemon: 'Pikachu',
      streak: 12,
      rival: 'Charizard'
    },
    {
      position: 2,
      player: 'Misty',
      pokemon: 'Starmie',
      streak: 10,
      rival: 'Bulbasaur'
    },
    {
      position: 3,
      player: 'Brock',
      pokemon: 'Onix',
      streak: 9,
      rival: 'Pidgeotto'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <h1 className="text-2xl font-semibold mb-6 text-center">Leaderboard</h1>
      <div className="">
        <table className="min-w-full bg-white rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 text-left">Position</th>
              <th className="py-2 px-4 text-left">Player</th>
              <th className="py-2 px-4 text-left">Pokemon</th>
              <th className="py-2 px-4 text-left">Streak</th>
              <th className="py-2 px-4 text-left">Rival</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <tr className="">
                <td className="py-2 px-4">{entry.position}</td>
                <td className="py-2 px-4">{entry.player}</td>
                <td className="py-2 px-4">{entry.pokemon}</td>
                <td className="py-2 px-4">{entry.streak}</td>
                <td className="py-2 px-4">{entry.rival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardPage;
