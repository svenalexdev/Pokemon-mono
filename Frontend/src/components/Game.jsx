import Context from '../utils/Context';
import { useEffect, useState } from 'react';
import GameVisual from './gameassets/GameVisual';
import BattleMenu from './gameassets/BattleMenu';
import { typeEffective } from '../utils/battleLogic';

export const myPokemonName = 'blaziken';
// export const enemyName = Math.floor(Math.random() * 386) + 1;
export const enemyName = 'bulbasaur';

function Game() {
  //ai
  // Game state
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [aiPokemon, setAiPokemon] = useState(null);
  const [playerMove, setPlayerMove] = useState(null);
  const [aiMove, setAiMove] = useState(null);
  const [isPlayerMoveLocked, setIsPlayerMoveLocked] = useState(false);
  const [isAiMoveLocked, setIsAiMoveLocked] = useState(false);
  const [winner, setWinner] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Pokémon data Working
  useEffect(() => {
    const fetchPokemon = async (name, isPlayer) => {
      try {
        // Fetch Pokémon data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();

        // Create moves from types
        const moves = data.types.map(type => ({
          name: type.type.name,
          type: type.type.name,
          damageClass: 'physical', // Default to physical
          power: 40 // Base power for type moves
        }));

        // Add a basic "Tackle" move as fallback

        moves.push({
          name: 'tackle',
          type: 'normal',
          damageClass: 'physical',
          power: 40
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
      } catch (error) {
        console.error(`Error fetching ${name}:`, error);
        return null;
      }
    };

    const fetchAllPokemon = async () => {
      const player = await fetchPokemon(myPokemonName, true);
      const ai = await fetchPokemon(enemyName, false);

      setPlayerPokemon(player);
      setAiPokemon(ai);
      setIsLoading(false);
    };

    fetchAllPokemon();
  }, []);

  // Handle AI move selection
  useEffect(() => {
    if (isPlayerMoveLocked && !isAiMoveLocked && aiPokemon) {
      const randomIndex = Math.floor(Math.random() * aiPokemon.moves.length);
      setAiMove(aiPokemon.moves[randomIndex]);
      setIsAiMoveLocked(true);
    }
  }, [isPlayerMoveLocked, isAiMoveLocked, aiPokemon]);

  // Handle turn execution
  useEffect(() => {
    if (isPlayerMoveLocked && isAiMoveLocked && playerPokemon && aiPokemon) {
      // Create copies to avoid direct state mutation
      const playerCopy = { ...playerPokemon };
      const aiCopy = { ...aiPokemon };

      // Determine turn order
      if (playerCopy.speed > aiCopy.speed) {
        calculateDamage(playerCopy, aiCopy, playerMove);
        if (aiCopy.hp > 0) {
          calculateDamage(aiCopy, playerCopy, aiMove);
        }
      } else {
        calculateDamage(aiCopy, playerCopy, aiMove);
        if (playerCopy.hp > 0) {
          calculateDamage(playerCopy, aiCopy, playerMove);
        }
      }

      // Update state
      setPlayerPokemon(playerCopy);
      setAiPokemon(aiCopy);

      // Reset moves
      setPlayerMove(null);
      setAiMove(null);
      setIsPlayerMoveLocked(false);
      setIsAiMoveLocked(false);

      // Check for winner
      if (playerCopy.hp <= 0) setWinner('ai');
      if (aiCopy.hp <= 0) setWinner('player');
    }
  }, [isPlayerMoveLocked, isAiMoveLocked]);

  // Damage calculation function
  // Modified damage calculation
  const calculateDamage = (attacker, defender, move) => {
    // Always use attack stat (simplified)
    const attackStat = attacker.attack;
    const defenseStat = defender.defense;

    // Calculate type effectiveness
    let effectiveness = 1;
    defender.types.forEach(type => {
      if (typeEffective[move.type]?.[type]) {
        effectiveness *= typeEffective[move.type][type];
      }
    });

    // Calculate damage
    const baseDamage = Math.floor(Math.random() * 6) + 3;
    const damage = Math.floor((attackStat / defenseStat) * (baseDamage + effectiveness) * effectiveness);
    console.log(
      `complete ${damage}, attackStatattackStat ${attackStat}, defenseStat ${defenseStat}, baseDamage ${baseDamage}, effectiveness ${effectiveness}`
    );

    // Apply damage
    defender.hp = Math.max(0, defender.hp - damage);

    // Log effectiveness
    logEffectiveness(move.name, effectiveness);

    // Add to battle log
    setBattleLog(prev => [...prev, `${attacker.name} used ${move.name}! (${damage} damage)`]);
  };

  // Effectiveness logging
  const logEffectiveness = (moveName, effectiveness) => {
    let message;
    if (effectiveness > 1) {
      message = `Super effective! (${effectiveness}x)`;
    } else if (effectiveness < 1 && effectiveness > 0) {
      message = `Not very effective... (${effectiveness}x)`;
    } else if (effectiveness === 0) {
      message = `No effect!`;
    } else {
      message = `Hit!`;
    }

    setBattleLog(prev => [...prev, `${moveName}: ${message}`]);
  };

  // Player move selection handler
  const handlePlayerMove = move => {
    setPlayerMove(move);
    setIsPlayerMoveLocked(true);
  };

  // Reset game
  const resetGame = () => {
    if (playerPokemon) setPlayerPokemon({ ...playerPokemon, hp: playerPokemon.maxHp });
    if (aiPokemon) setAiPokemon({ ...aiPokemon, hp: aiPokemon.maxHp });
    setPlayerMove(null);
    setAiMove(null);
    setIsPlayerMoveLocked(false);
    setIsAiMoveLocked(false);
    setWinner(null);
    setBattleLog([]);
  };

  // Context value
  const contextValue = {
    playerPokemon,
    aiPokemon,
    battleLog,
    winner,
    handlePlayerMove,
    resetGame,
    isPlayerMoveLocked
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading Pokémon...</div>;
  }
  //end ai
  // const [playerPokemon, setPlayerPokemon] = useState(null);

  return (
    <Context.Provider value={contextValue}>
      <div
        style={{ fontFamily: 'PokemonFont, sans-serif' }}
        className="w-[1200px] h-[800px] mx-auto mt-10 relative tracking-wider "
      >
        <GameVisual />
        <BattleMenu />
      </div>
    </Context.Provider>
  );
}

export default Game;
