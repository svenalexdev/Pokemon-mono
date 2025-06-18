import MenubarBackground from '../../assets/MenuBarBackground.png';
import MenubarOverlay from '../../assets/MenuBarOverlay.png';

function BattleMenu() {
  return (
    <div className="pixelated">
      <div className="relative">
        <img src={MenubarBackground} alt="" className="w-full" />
        <div className="absolute bottom-0 right-0">
          <img src={MenubarOverlay} alt="" className="h-[240px]" />
        </div>
      </div>
    </div>
  );
}

export default BattleMenu;
