import React from 'react';
import { useState } from 'react';
import GameVisual from './gameassets/GameVisual';
import BattleMenu from './gameassets/BattleMenu';

// API Values here
export const myPokemonName = 'hariyama';
export const myPokemonNameCapital = myPokemonName.charAt(0).toUpperCase() + myPokemonName.slice(1).toLowerCase();
export const myPokemonTypes = '';
export const myPokemonHP = 0;
export const myPokemonSpeed = 0;
export const myPokemonAt = 0;
export const myPokemonDef = 0;
export const myPokemonSpAt = 0;
export const myPokemonSpDef = 0;

export const enemyName = 'hooh';
export const enemyPokemonNameCapital = enemyName.charAt(0).toUpperCase() + enemyName.slice(1).toLowerCase();
export const enemyPokemonHP = 0;
export const enemyPokemonSpeed = 0;
export const enemyPokemonAt = 0;
export const enemyPokemonDef = 0;
export const enemyPokemonSpAt = 0;
export const enemyPokemonSpDef = 0;

export const Context = React.createContext();

function Game() {
  // all the useStates for the Game here
  const [myPokemonHP, setMyPokemonHP] = useState(null);

  return (
    <Context.Provider value={[myPokemonHP, setMyPokemonHP]}>
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
