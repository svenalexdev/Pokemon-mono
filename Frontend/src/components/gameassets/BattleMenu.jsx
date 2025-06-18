import MenubarBackground from '../../assets/MenuBarBackground.png';
import MenubarOverlay from '../../assets/MenuBarOverlay.png';
import { myPokemonNameCapital } from '../Game';

function BattleMenu() {
  return (
    <div className="pixelated">
      <div className="relative">
        <img src={MenubarBackground} alt="" className="w-full" />
        <div className="absolute text-white top-16 left-16 font-medium text-4xl">
          What will {myPokemonNameCapital} do?
        </div>
        <div className="absolute bottom-0 right-0">
          <img src={MenubarOverlay} alt="" className="h-[240px]" />
        </div>
      </div>
    </div>
  );
}

export default BattleMenu;
