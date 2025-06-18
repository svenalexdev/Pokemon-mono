//Around 1500px w
import GameVisual from './gameassets/GameVisual';
import BattleMenu from './gameassets/BattleMenu';

function Game() {
  return (
    <div className="w-[1200px] h-[800px] mx-auto mt-10">
      <GameVisual />
      <BattleMenu />
    </div>
  );
}

export default Game;
