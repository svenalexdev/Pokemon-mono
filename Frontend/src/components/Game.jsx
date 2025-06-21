import Context from '../utils/Context';
import { useEffect, useState } from 'react';
import GameVisual from './gameassets/GameVisual';
import BattleMenu from './gameassets/BattleMenu';
import { typeEffective } from '../utils/battleLogic';
import { fetchPokemonFight } from '../utils/fetchData';
import IntroScreen from './gameassets/IntroScreen';

function Game() {
  //ai
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [playerPokemonName, setPlayerPokemonName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [aiPokemon, setAiPokemon] = useState(null);
  const [playerMove, setPlayerMove] = useState(null);
  const [aiMove, setAiMove] = useState(null);
  const [isPlayerMoveLocked, setIsPlayerMoveLocked] = useState(false);
  const [isAiMoveLocked, setIsAiMoveLocked] = useState(false);
  const [winner, setWinner] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playerAnimation, setPlayerAnimation] = useState(false);
  const [aiAnimation, setAiAnimation] = useState(false);
  const myPokemonName = playerPokemonName;

  const handleStartGame = (name, pokemon) => {
    setPlayerName(name);
    setPlayerPokemonName(pokemon);
    setGameStarted(true);
  };

  const triggerPlayerAnimation = () => {
    setPlayerAnimation(true);
    setTimeout(() => setPlayerAnimation(false), 300);
  };

  const triggerAiAnimation = () => {
    setAiAnimation(true);
    setTimeout(() => setAiAnimation(false), 300);
  };

  // set LocalStorage name
  useEffect(() => {
    if (playerName) {
      localStorage.setItem('pokemonPlayerName', playerName);
    }
  }, [playerName]);

  // Fetch data
  useEffect(() => {
    if (!gameStarted) return;

    const fetchPokemon = async name => {
      try {
        return fetchPokemonFight(name);
      } catch (error) {
        console.error(`Error fetching ${name}:`, error);
        return null;
      }
    };

    const fetchAllPokemon = async () => {
      const player = await fetchPokemon(myPokemonName, true);
      const ai = await fetchPokemon(Math.floor(Math.random() * 386) + 1, false);

      setPlayerPokemon(player);
      setAiPokemon(ai);
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsLoading(false);
    };

    fetchAllPokemon();
  }, [gameStarted, playerPokemonName]);

  const nextAiPokemon = async () => {
    const fetchPokemon = async name => {
      try {
        return fetchPokemonFight(name);
      } catch (error) {
        console.error(`Error fetching ${name}:`, error);
        return null;
      }
    };
    const ai = await fetchPokemon(Math.floor(Math.random() * 386) + 1, false);
    setAiPokemon(ai);
  };

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
      const executeTurn = async () => {
        if (playerPokemon.speed > aiPokemon.speed) {
          // Player attacks first

          triggerPlayerAnimation();
          // await new Promise(resolve => setTimeout(resolve, 600));
          calculateDamage(playerPokemon, aiPokemon, playerMove);
          await new Promise(resolve => setTimeout(resolve, 600));

          if (aiPokemon.hp > 0) {
            // AI attacks back
            triggerAiAnimation();
            // await new Promise(resolve => setTimeout(resolve, 600));
            calculateDamage(aiPokemon, playerPokemon, aiMove);
            await new Promise(resolve => setTimeout(resolve, 600));
          }
        } else {
          // AI attacks first
          triggerAiAnimation();
          // await new Promise(resolve => setTimeout(resolve, 600));
          calculateDamage(aiPokemon, playerPokemon, aiMove);
          await new Promise(resolve => setTimeout(resolve, 600));

          if (playerPokemon.hp > 0) {
            // Player attacks back
            triggerPlayerAnimation();
            // await new Promise(resolve => setTimeout(resolve, 600));
            calculateDamage(playerPokemon, aiPokemon, playerMove);
            await new Promise(resolve => setTimeout(resolve, 600));
          }
        }

        setPlayerMove(null);
        setAiMove(null);
        setIsPlayerMoveLocked(false);
        setIsAiMoveLocked(false);

        if (playerPokemon.hp <= 0) setWinner('ai');
        if (aiPokemon.hp <= 0) setWinner('player');
      };

      executeTurn();
    }
  }, [isPlayerMoveLocked, isAiMoveLocked]);

  // Damage calculation function
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
    const damage = Math.floor((attackStat / defenseStat) * (baseDamage + effectiveness) * effectiveness + 1);
    console.log(
      `complete ${damage}, attackStatattackStat ${attackStat}, defenseStat ${defenseStat}, baseDamage ${baseDamage}, effectiveness ${effectiveness}`
    );

    // Apply damage
    defender.hp = Math.max(0, defender.hp - damage);
  };

  useEffect(() => {
    if (winner === 'ai' || winner === 'player') {
      console.log(`Winner is ${winner === 'ai' ? 'AI' : 'Player'}`);
      setTimeout(() => {
        if (winner === 'ai') {
          endGame();
        } else {
          resetGame();
        }
      }, 1500);
    }
  }, [winner]);

  // Reset game
  const resetGame = () => {
    if (playerPokemon) setPlayerPokemon({ ...playerPokemon, hp: playerPokemon.maxHp });
    nextAiPokemon();
    setTimeout(() => {
      setPlayerMove(null);
      setAiMove(null);
      setIsPlayerMoveLocked(false);
      setIsAiMoveLocked(false);
      setWinner(null);
      setBattleLog([]);
    }, 300);
  };

  const endGame = () => {
    console.log('Game ended');
    setGameStarted(false);
    // setSelectedPokemon(null);
    setPlayerPokemon(null);
    setAiPokemon(null);
    setIsLoading(true);
    setPlayerMove(null);
    setAiMove(null);
    setIsPlayerMoveLocked(false);
    setIsAiMoveLocked(false);
    setWinner(null);
  };

  // Player move selection handler
  const handlePlayerMove = move => {
    setPlayerMove(move);
    setIsPlayerMoveLocked(true);
  };

  // Context value
  const contextValue = {
    playerPokemon,
    aiPokemon,
    battleLog,
    winner,
    handlePlayerMove,
    resetGame,
    isPlayerMoveLocked,
    playerAnimation,
    aiAnimation
  };

  if (!gameStarted) {
    return <IntroScreen onStartGame={handleStartGame} />;
  }

  if (isLoading) {
    return <div className="text-center mt-10">Loading Pokémon...</div>;
  }
  //end ai

  return (
    <Context.Provider value={contextValue}>
      <div
        style={{ fontFamily: 'PokemonFont, sans-serif' }}
        className="w-[1200px] h-[800px] mx-auto mt-10 relative tracking-wider"
      >
        <GameVisual />
        <BattleMenu />
      </div>
    </Context.Provider>
  );
}

export default Game;
