import { useState, useEffect } from 'react';
import { getLeaderboardEntry } from '../data';
import { useNavigate } from 'react-router';

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboardEntry();
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-blue-100 to-purple-200 min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-700">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-black">
        <h1 className="text-2xl font-semibold mb-4">Leaderboard</h1>
        <p className="text-gray-700">No entries yet — play some battles to get a top position!</p>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: 'PokemonFont, sans-serif' }}
      className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 text-black flex flex-col"
    >
      <div className="max-w-4xl mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">Leaderboard</h1>
        <div className="h-16 flex justify-start items-center">
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white mx-auto py-2 px-4 rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Back to Home
          </button>
        </div>
        <div className="overflow-x-auto">
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
              {leaderboard.map((entry, index) => (
                <tr key={index}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{entry.username}</td>
                  <td className="py-2 px-4">{entry.playerPokemon}</td>
                  <td className="py-2 px-4">{entry.winningStreak}</td>
                  <td className="py-2 px-4">{entry.rivalPokemon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
