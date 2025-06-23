import { useNavigate } from 'react-router';

function HowToPlay() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-100 p-6 text-black flex flex-col items-center">
      <img src="/PokeBrawlLogo.png" alt="" className="mx-auto w-70 drop-shadow-xl mb-5" />
      <div className="flex justify-start items-center">
        <button
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white mx-auto py-2 px-4 rounded-md hover:bg-indigo-700 cursor-pointer"
        >
          Back to Home
        </button>
      </div>
      <h1 className="text-2xl mt-6 font-semibold mb-3 text-center" style={{ fontFamily: 'PokemonFont, sans-serif' }}>
        How To Play PokeBrawl
      </h1>

      <div className="max-w-2xl space-y-6 text-lg">
        <p>
          <strong>1. Register / Login:</strong> Start by creating an account or logging in, or play as a guest.
        </p>
        <p>
          <strong>2. Choose a Pokémon:</strong> Once logged in, select your favorite Pokémon from the available options.
        </p>
        <p>
          <strong>3. Start Battling:</strong> Head to the battle arena and challenge rivals to improve your streak.
        </p>
        <p>
          <strong>4. Climb the Leaderboard:</strong> Win battles to increase your streak and rise in the rankings!
        </p>
        <p>
          <strong>5. Know Your Opponent:</strong> Each rival Pokémon presents a different challenge. Learn their
          strengths and weaknesses!
        </p>
      </div>
    </div>
  );
}

export default HowToPlay;
