import Game from '../components/Game';

function HomePage() {
  return (
    <div className=" bg-gradient-to-b from-indigo-100 to-blue-200 items-center justify-center p-6 text-black">
      <div className="absolute right-6 top-1/3 flex flex-col space-y-4">
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">Battle</button>
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">Leaderboard</button>
        <button className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900">Login</button>
        <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">Register</button>
      </div>
      <Game />
    </div>
  );
}

export default HomePage;
