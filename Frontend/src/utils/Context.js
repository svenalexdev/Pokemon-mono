import { createContext } from 'react';

const Context = createContext({
  // Default values that match the structure of contextValue
  playerPokemon: '',
  aiPokemon: '',
  battleLog: [],
  winner: null,
  handlePlayerMove: () => {},
  resetGame: () => {},
  isPlayerMoveLocked: false,
  playerAnimation: false,
  aiAnimation: false,
  setPlayerName: () => {},
  // searchTerm: '',
  // setSearchTerm: () => {},
  searchResults: [],
  setSearchResults: () => {},
  selectedPokemon: null,
  setSelectedPokemon: () => {},
  isSearching: false,
  setIsSearching: () => {},
  error: null,
  setError: () => {},
  handleStartGame: () => {},
  endGame: () => {}
});

export default Context;
