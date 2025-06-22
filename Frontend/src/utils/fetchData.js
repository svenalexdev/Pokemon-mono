function fetchPokemon() {
  const apiKey = 'https://pokeapi.co/api/v2/pokemon?limit=386';
  const apiKeySearch = 'https://pokeapi.co/api/v2/pokemon/';

  const fetchedPokemon = async searchPokemon => {
    if (searchPokemon) {
      const res = await fetch(apiKeySearch + searchPokemon);
      if (!res.ok) {
        throw new Error(`HTTP Error! ${res.status}`);
      }
      const data = await res.json();
      return data;
    } else {
      try {
        const res = await fetch(apiKey);
        if (!res.ok) {
          throw new Error(`HTTP Error! ${res.status}`);
        }
        const data = await res.json();
        const pokemonArray = data.results;

        const pokemonData = await Promise.all(
          pokemonArray.map(async pokemon => {
            const pokemonUrl = pokemon.url;
            const res = await fetch(pokemonUrl);
            if (!res.ok) {
              throw new Error(`HTTP Error! ${res.status}`);
            }
            return await res.json();
          })
        );
        return pokemonData;
      } catch (err) {
        console.log('ERROR FETCHING POKEMON', err);
      }
    }
  };
  return fetchedPokemon();
}

const fetchPokemonFight = async name => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();

  // Create moves from types
  const moves = data.types.map(type => ({
    name: type.type.name,
    type: type.type.name,
    damageClass: 'physical', // Default to physical
    power: 40 // Base power for type moves
  }));

  moves.push({
    name: 'tackle',
    type: 'normal',
    damageClass: 'physical',
    power: 20
  });

  // Create Pokémon object
  return {
    name: data.name,
    hp: data.stats[0].base_stat,
    maxHp: data.stats[0].base_stat,
    speed: data.stats[5].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    specialAttack: data.stats[3].base_stat,
    specialDefense: data.stats[4].base_stat,
    types: data.types.map(t => t.type.name),
    moves: moves
  };
};

export { fetchPokemon, fetchPokemonFight };
