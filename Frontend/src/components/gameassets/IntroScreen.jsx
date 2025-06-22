import { useState, useEffect } from 'react';
import { fetchPokemonFight } from '../../utils/fetchData';
import ProfEich from '../../assets/ProfEich.png';
import Ground from '../../assets/StandingGround.png';
import Pokeball from '../../assets/Pokeball.png';
import IntroBackground from '../../assets/IntroBackground.png';
import { transformPokemonName } from '../../utils/transformPokemonName';

function IntroScreen({ onStartGame }) {
  const [playerName, setPlayerName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [isRandomizing, setIsRandomizing] = useState(false);

  // Get random Ai Pokemon
  const handleRandomPokemon = async () => {
    setIsRandomizing(true);
    setIsSearching(true);
    setError(null);

    try {
      const randomId = Math.floor(Math.random() * 386) + 1;
      const pokemon = await fetchPokemonFight(randomId);

      setSelectedPokemon(pokemon);
      setSearchTerm(pokemon.name);
      setSearchResults([pokemon]);
    } catch (error) {
      setError('Failed to get random Pokémon. Please try again.');
      console.error('Random Pokémon error:', error);
    } finally {
      setIsSearching(false);
      setIsRandomizing(false);
    }
  };

  // Insert localStorage Name into field
  useEffect(() => {
    const savedName = localStorage.getItem('username');
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  // useEffect for Search Pokemon field
  useEffect(() => {
    const searchPokemon = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      setError(null);

      try {
        // Try to fetch the exact match first
        const pokemon = await fetchPokemonFight(searchTerm.toLowerCase());
        setSearchResults([pokemon]);
        setIsSearching(false);
      } catch (err) {
        // If exact match fails, try to search from a list
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=386`);
          const data = await response.json();
          const filtered = data.results.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase())).slice(0, 5); // Limit to 5 results
          // Fetch details for the filtered results
          const detailedResults = await Promise.all(
            filtered.map(async pokemon => {
              return await fetchPokemonFight(pokemon.name);
            })
          );
          setSearchResults(detailedResults);
        } catch (error) {
          setError("Couldn't find any Pokémon. Try a different name.");
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }
    };

    const timer = setTimeout(() => {
      if (searchTerm) searchPokemon();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handlePokemonSelect = pokemon => {
    setSelectedPokemon(pokemon);
    setSearchTerm(pokemon.name);
    setSearchResults([]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (playerName && selectedPokemon) {
      onStartGame(playerName, selectedPokemon.name);
    }
  };

  return (
    <div className="w-[1200px] h-[630px] mx-auto mt-10 relative tracking-wider pixelated z-1 shadow-2xl">
      <img src={IntroBackground} alt="" className="w-[1200px] h-[630px] absolute right-0 bottom-0 -z-1" />
      <div className="absolute -z-1 left-3 top-5 w-[404px] h-[210px] rounded-xl bg-white"></div>
      <div className="absolute -z-1 left-3 bottom-5 w-[404px] h-[315px] rounded-xl bg-white"></div>
      <div className=" p-8 mx-auto" style={{ fontFamily: 'PokemonFont, sans-serif' }}>
        <h1 className="text-2xl mt-1 font-bold mb-4 uppercase">
          Hello! Welcome <br></br> to PokeBrawl!
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-90">
            <img src={Ground} alt="" className="absolute right-10 bottom-8 w-80" />
            <img src={Ground} alt="" className="absolute right-103 bottom-8 w-80" />
            <img src={ProfEich} alt="" className="absolute right-17 bottom-18 w-70" />
            <img
              src={Pokeball}
              alt=""
              className={`absolute right-72 bottom-67 w-12 ${
                selectedPokemon ? 'right-90 bottom-80 transition-all duration-400 ease-out opacity-0' : ''
              }`}
            />

            <span className="text-2xl  uppercase">My name is OAK! People call me the POKEMON PROF!</span>
            <label className="block mt-25 mb-2 text-xl uppercase">
              First of all...<br></br> what is your name?
            </label>
            <input
              type="text"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              className="w-full p-2 border rounded bg-white"
              required
            />
            {/* {playerName && (
              <p className="text-sm text-gray-500 mt-1">Welcome back, {playerName}! Choose your Pokémon.</p>
            )} */}
          </div>
          <div className="mb-4 w-90 relative">
            <label className="block mb-2 text-xl uppercase">What Pokemon do you want to fight with?</label>
            <input
              type="text"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                if (e.target.value !== selectedPokemon?.name) {
                  setSelectedPokemon(null);
                }
              }}
              placeholder="Search Pokemon..."
              className="w-full p-2 border rounded bg-white"
              required
            />

            {!isSearching && searchResults.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto">
                {searchResults.map(pokemon => (
                  <div
                    key={pokemon.name}
                    className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                      selectedPokemon?.name === pokemon.name ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => handlePokemonSelect(pokemon)}
                  >
                    <img
                      src={`https://play.pokemonshowdown.com/sprites/gen5ani/${transformPokemonName(pokemon.name)}.gif`}
                      alt={pokemon.name}
                      className="w-8 h-8 mr-2"
                    />
                    <span className="capitalize">{pokemon.name}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={handleRandomPokemon}
              disabled={isSearching}
              className={`w-90 py-2 px-4 mt-3 rounded cursor-pointer ${
                isSearching ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              {isSearching ? 'Loading...' : 'Get Random Pokemon'}
            </button>
            {/* {isSearching && (
              <div className="absolute z-10 w-full bg-white border rounded mt-1 p-2">
                <div className="text-center py-2">Searching...</div>
              </div>
            )} */}

            {/* {error && !isSearching && searchResults.length === 0 && searchTerm.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded mt-1 p-2 text-red-500">{error}</div>
            )} */}
          </div>
          {selectedPokemon && (
            <div>
              <img
                src={`https://play.pokemonshowdown.com/sprites/gen5ani/${transformPokemonName(
                  selectedPokemon.name
                )}.gif`}
                alt=""
                className={'absolute w-90 h-50 object-contain right-98 bottom-15'}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!playerName || !selectedPokemon}
            className={`text-2xl absolute right-98 top-5 w-90 py-4 px-4 rounded cursor-pointer ${
              playerName && selectedPokemon ? 'bg-red-500 hover:bg-red-600 text-white' : 'opacity-0 cursor-not-allowed'
            }`}
          >
            Start Battle!
          </button>
        </form>
      </div>
    </div>
  );
}

export default IntroScreen;
