import Context from '../utils/Context';
import { useEffect, useState } from 'react';
import GameVisual from './gameassets/GameVisual';
import BattleMenu from './gameassets/BattleMenu';
import { typeEffective } from '../utils/battleLogic';
import { fetchPokemonFight } from '../utils/fetchData';
import IntroScreen from './gameassets/IntroScreen';
import IntroBackground from '../assets/IntroBackground.png';
import { createLeaderboardEntry } from '../data';

function Game() {
  // Big mess of useStates (filter later?)
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

  // for IntroScreen.jsx
  const handleStartGame = (name, pokemon) => {
    setPlayerName(name);
    setPlayerPokemonName(pokemon);
    setGameStarted(true);
    localStorage.setItem('winningStreak', 1);
  };

  // Animation Trigger for attacks
  const triggerPlayerAnimation = () => {
    setPlayerAnimation(true);
    setTimeout(() => setPlayerAnimation(false), 300);
  };
  const triggerAiAnimation = () => {
    setAiAnimation(true);
    setTimeout(() => setAiAnimation(false), 300);
  };

  // set all localstorage items
  // set LocalStorage name
  useEffect(() => {
    if (playerName) {
      localStorage.setItem('username', playerName);
    }
  }, [playerName]);
  useEffect(() => {
    if (playerPokemonName) {
      const capitalizedName = playerPokemonName.charAt(0).toUpperCase() + playerPokemonName.slice(1);
      localStorage.setItem('playerPokemon', capitalizedName);
    }
  }, [playerPokemonName]);
  useEffect(() => {
    if (aiPokemon) {
      const capitalizedName = aiPokemon.name.charAt(0).toUpperCase() + aiPokemon.name.slice(1);
      localStorage.setItem('rivalPokemon', capitalizedName);
    }
  }, [aiPokemon]);

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

  // Next AiPokemon Fetch after win
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
    const physicalTypes = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel'];
    const specialTypes = ['fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark'];

    const isPhysical = physicalTypes.includes(move.type);
    const isSpecial = specialTypes.includes(move.type);

    const attackStat = isPhysical ? attacker.attack : attacker.specialAttack;
    const defenseStat = isPhysical ? defender.defense : defender.specialDefense;

    // Calculate type effectiveness from utils/battleLogic.js
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
      `complete ${damage}, attackStat ${attackStat}, defenseStat ${defenseStat}, baseDamage ${baseDamage}, effectiveness ${effectiveness}, isPhysical ${
        (isPhysical, isSpecial)
      }: ${move.type}
      }`
    );

    // Apply damage
    defender.hp = Math.max(0, defender.hp - damage);
  };

  // When Player wins for next round
  useEffect(() => {
    if (winner === 'ai' || winner === 'player') {
      console.log(`Winner is ${winner === 'ai' ? 'AI' : 'Player'}`);
      setTimeout(() => {
        if (winner === 'player') {
          resetGame();
        }
      }, 1500);
    }
  }, [winner]);

  // Reset game (actually next round if player wins)
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

  // Killswitch
  const setHpToOne = () => {
    if (playerPokemon) {
      setPlayerPokemon({
        ...playerPokemon,
        hp: 1 // Set HP to 1
      });
    }
  };

  // Function when Player loses (executed in BattleMenu.jsx)
  const endGame = async () => {
    console.log('Game ended');
    // CRUD OPERATION FOR LOCAL STORAGE HERE
    // const userId = localStorage.getItem('userId');
    // if (!userId) {
    //   console.log('User not sign in');
    // } else {
    const resultsFight = {
      username: localStorage.getItem('username'),
      playerPokemon: localStorage.getItem('playerPokemon'),
      winningStreak: Number(localStorage.getItem('winningStreak')),
      rivalPokemon: localStorage.getItem('rivalPokemon'),
      isGuest: localStorage.getItem('isGuest') || true
    };
    await createLeaderboardEntry(resultsFight);
    // }

    localStorage.setItem('winningStreak', 1);
    setGameStarted(false);
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
    aiAnimation,
    endGame,
    setHpToOne
  };

  if (!gameStarted) {
    return <IntroScreen onStartGame={handleStartGame} />;
  }

  // Loading Screen
  if (isLoading) {
    return (
      <>
        <div className="w-[1200px] h-[630px] mx-auto mt-5 relative tracking-wider pixelated z-1">
          <img src={IntroBackground} alt="" className="w-[1200px] h-[630px] absolute top-0 left-0" />
          <div
            style={{ fontFamily: 'PokemonFont, sans-serif' }}
            className="absolute bottom-90 left-110 text-center text-4xl mt-10 z-2"
          >
            Loading Game...
          </div>
        </div>
      </>
    );
  }

  return (
    <Context.Provider value={contextValue}>
      <div
        style={{ fontFamily: 'PokemonFont, sans-serif' }}
        className="w-[1200px] h-[800px] mx-auto mt-5 relative tracking-wider shadow-2xl"
      >
        <GameVisual />
        <BattleMenu />
      </div>
    </Context.Provider>
  );
}

export default Game;
