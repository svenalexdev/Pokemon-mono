import React from 'react';
import { useEffect, useState } from 'react';
import GameVisual from './gameassets/GameVisual';
import BattleMenu from './gameassets/BattleMenu';
export const myPokemonName = 'hariyama';
export const myPokemonNameCapital = myPokemonName.charAt(0).toUpperCase() + myPokemonName.slice(1).toLowerCase();
export const enemyName = 'hooh';
export const enemyPokemonNameCapital = enemyName.charAt(0).toUpperCase() + enemyName.slice(1).toLowerCase();

const getPlaceholderPokemon = name => ({
  name,
  hp: 100,
  attack: 50,
  defense: 50,
  specialAttack: 60,
  specialDefense: 50,
  speed: 70,
  moves: [
    { name: 'tackle', type: 'normal', power: 40 },
    { name: 'flamethrower', type: 'fire', power: 90 },
    { name: 'water-gun', type: 'water', power: 40 },
    { name: 'quick-attack', type: 'normal', power: 40 }
  ]
});
export const Context = React.createContext();

function Game() {
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [aiPokemon, setAiPokemon] = useState(null);

  const [playerMove, setPlayerMove] = useState(null);
  const [aiMove, setAiMove] = useState(null);

  const [isPlayerMoveLocked, setIsPlayerMoveLocked] = useState(false);
  const [isAiMoveLocked, setIsAiMoveLocked] = useState(false);

  const [winner, setWinner] = useState(null);

  // Initial, hardcoded w/ placeholder
  useEffect(() => {
    setPlayerPokemon(getPlaceholderPokemon('pikachu'));
    setAiPokemon(getPlaceholderPokemon('charmander'));
  }, []);

  // If player selected move, AI selects automatically (moves later from fetch, not mock)
  useEffect(() => {
    if (isPlayerMoveLocked && !isAiMoveLocked && aiPokemon) {
      const randomIndex = Math.floor(Math.random() * aiPokemon.moves.length);
      setAiMove(aiPokemon.moves[randomIndex]);
      setIsAiMoveLocked(true);
    }
  }, [isPlayerMoveLocked, isAiMoveLocked, aiPokemon]);

  // Lock player move
  const handlePlayerMoveSelect = move => {
    if (!isPlayerMoveLocked) {
      setPlayerMove(move);
      setIsPlayerMoveLocked(true);
    }
  };
  return (
    <Context.Provider value={[playerPokemon, setPlayerPokemon]}>
      <div
        style={{ fontFamily: 'PokemonFont, sans-serif' }}
        className="w-[1200px] h-[800px] mx-auto mt-10 relative tracking-wider "
      >
        <GameVisual />
        <BattleMenu
          moves={playerPokemon?.moves || []}
          onSelectMove={handlePlayerMoveSelect}
          isLocked={isPlayerMoveLocked}
        />
      </div>
    </Context.Provider>
  );
}

export default Game;
