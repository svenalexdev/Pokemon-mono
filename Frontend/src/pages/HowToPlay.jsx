import { useNavigate } from 'react-router';

function HowToPlay() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-100 p-6 text-black flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">How To Play PokeBrawl</h1>

      <div className="max-w-2xl space-y-6 text-lg">
        <p>
          <strong>1. Register / Login:</strong> Start by creating an account or logging in.
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

      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Back to Home
      </button>
    </div>
  );
}

export default HowToPlay;
