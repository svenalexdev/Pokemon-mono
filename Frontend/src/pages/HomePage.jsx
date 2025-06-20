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

      <div className="max-w-5xl w-full flex flex-col items-center space-y-10">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Enter Your Username</h1>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your username"
              className="p-2 border border-gray-300 rounded-md text-black"
            />
            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Confirm Username
            </button>
          </form>
        </div>

        <div className="w-full text-center">
          <h1 className="text-4xl font-bold mb-2">Choose Your Pokémon</h1>
          <p className="mb-6 text-lg">
            Welcome, <span className="font-semibold">[username]</span>!
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transform transition text-center">
              <h2 className="text-xl capitalize font-semibold text-black">Pokémon Name</h2>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 hover:scale-105 transform transition text-center">
              <h2 className="text-xl capitalize font-semibold text-black">Pokémon Name</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
