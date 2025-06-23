import { useEffect } from 'react';
import Game from '../components/Game';
import { getLeaderboardEntry } from '../data';
import { useNavigate } from 'react-router';

function Homepage() {
  useEffect(() => {
    const leaderboardFirstConnect = async () => {
      const results = await getLeaderboardEntry();
      console.log('Starting Connection to API for Leaderboard, Result should be array of objects:', results);
    };
    leaderboardFirstConnect();
  }, []);
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('login');
  };

  const goToLeaderboardPage = () => {
    navigate('leaderboard');
  };

  const goToPokedex = () => {
    navigate('pokedex');
  };

  const goToHowToPlay = () => {
    navigate('howtoplay');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 p-6 text-black relative">
      <div className="w-[1700px] mx-auto">
        <img src="/PokeBrawlLogo.png" alt="" className="mx-auto w-70 drop-shadow-xl mb-5" />

        <div className="flex ">
          <div className="mx-auto space-x-8">
            <button
              onClick={goToLoginPage}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer transition-all duration-400 hover:bg-green-500"
            >
              Login
            </button>
            <button
              onClick={goToLeaderboardPage}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer transition-all duration-400 hover:bg-yellow-500"
            >
              Leaderboard
            </button>
            <button
              onClick={goToPokedex}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer transition-all duration-400 hover:bg-gray-600"
            >
              Pokedex
            </button>
            <button
              onClick={goToHowToPlay}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer transition-all duration-400 hover:bg-red-500"
            >
              How to Play
            </button>
          </div>
        </div>

        <Game />
      </div>
    </div>
  );
}

export default Homepage;
