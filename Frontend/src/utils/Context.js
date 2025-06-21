import { createContext } from 'react';

const Context = createContext({
  // Default values that match the structure of contextValue
  playerPokemon: '',
  aiPokemon: '',
  battleLog: [],
  winner: null,
  handlePlayerMove: () => {},
  resetGame: () => {},
  isPlayerMoveLocked: false
});

export default Context;
