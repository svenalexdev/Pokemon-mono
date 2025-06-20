import Game from '../components/Game';

import { useNavigate } from 'react-router';

function Homepage() {
  const navigate = useNavigate();

  const goToPokedex = () => {
    navigate('pokedex');
  };

  const goToLoginPage = () => {
    navigate('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 flex items-center justify-center p-6 text-black relative">
      <div className="absolute right-6 top-1/3 flex flex-col space-y-4">
        <button onClick={goToLoginPage} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
          Login
        </button>
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">Leaderboard</button>
        <button onClick={goToPokedex} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
          Pokedex
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">How to Play</button>
      </div>
      <Game />
    </div>
  );
}

export default Homepage;
