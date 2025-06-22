import MenubarBackground from '../../assets/MenuBarBackground.png';
import MenubarOverlay from '../../assets/MenuBarOverlay.png';
import { useContext } from 'react';
import Context from '../../utils/Context';
import { capitalizePokemonName } from '../../utils/transformPokemonName';

function BattleMenu() {
  const { playerPokemon, handlePlayerMove, isPlayerMoveLocked, winner, aiPokemon, endGame } = useContext(Context);

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
        {!winner ? (
          // Show move selection UI when there's no winner
          <>
            <div className="absolute text-white top-15 left-16 text-[2.9rem]">What will </div>
            <div className="absolute text-white top-30 left-16 text-[2.9rem]">
              {capitalizePokemonName(playerPokemon.name)} do?
            </div>
          </>
        ) : winner === 'player' ? (
          // Show victory message when player wins
          <div className="absolute w-[600px] text-white top-15 left-16 text-[2.9rem]">Next Opponent coming up!</div>
        ) : (
          // Show game over screen when AI wins
          <div className="absolute w-full text-white top-15 left-16 text-[2.9rem]">
            <div>Game Over!</div>
            <div className="text-[2rem] ">{capitalizePokemonName(aiPokemon.name)} defeated you!</div>
            <div className="absolute -top-6 right-31 z-2 h-40 bg-[#F8F8F8]">
              <button onClick={endGame} className=" mt-12 py-4 px-10 w-120 move-btn fire text-3xl rounded">
                Return to Main Menu
              </button>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 right-0">
          <img src={MenubarOverlay} alt="" className="h-[240px]" />
          <div className="absolute top-13 left-15 w-119 grid grid-cols-2 justify-between">{renderMoveButton()}</div>
        </div>
      </div>
    </div>
  );
}

export default BattleMenu;
