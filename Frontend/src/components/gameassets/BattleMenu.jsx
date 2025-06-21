import MenubarBackground from '../../assets/MenuBarBackground.png';
import MenubarOverlay from '../../assets/MenuBarOverlay.png';
import { useContext } from 'react';
import Context from '../../utils/Context';
import { capitalizePokemonName } from '../../utils/transformPokemonName';

function BattleMenu() {
  const { playerPokemon, handlePlayerMove, isPlayerMoveLocked, winner } = useContext(Context);

  const selectMove = move => {
    if (!isPlayerMoveLocked && !winner) {
      handlePlayerMove(move);
    }
  };
  const renderMoveButton = () => {
    if (!playerPokemon) return null;

    return playerPokemon.moves.map((move, index) => (
      <button
        key={index}
        onClick={() => selectMove(move)}
        disabled={isPlayerMoveLocked || !!winner}
        className={`move-btn ${move.type}`}
      >
        <span className="move-name">{move.name.toUpperCase()}</span>
      </button>
    ));
  };
  return (
    <div className="pixelated">
      <div className="relative">
        <img src={MenubarBackground} alt="" className="w-full" />
        <div className="absolute text-white top-15 left-16 text-[2.9rem]">What will </div>
        <div className="absolute text-white top-30 left-16 text-[2.9rem]">
          {capitalizePokemonName(playerPokemon.name)} do?
        </div>
        <div className="absolute bottom-0 right-0">
          <img src={MenubarOverlay} alt="" className="h-[240px]" />
          <div className="absolute top-13 left-15 w-119 grid grid-cols-2 justify-between">{renderMoveButton()}</div>
        </div>
      </div>
    </div>
  );
}

export default BattleMenu;
