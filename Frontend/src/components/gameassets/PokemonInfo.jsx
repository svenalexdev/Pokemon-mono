import { useState } from 'react';
import HPBar from '../../assets/PokemonInfo.png';
import { myPokemonNameCapital } from '../Game';

function PokemonInfo() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={HPBar} alt="" className="w-120" />
      <div className="absolute text-[1.9rem] bottom-24 left-18">{myPokemonNameCapital}</div>
      <div className="absolute font-black text-[1.7rem] bottom-24 right-11">Lv.0</div>
      <div className="absolute font-black text-[1.7rem] bottom-5 right-23">20 / 20</div>

      <div
        className={`
        absolute bottom-full left-0 w-full bg-blue-100 border-2 border-blue-300 rounded-b-lg
        overflow-hidden transition-all duration-300 ease-in-out
        ${isHovered ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'}
      `}
      >
        <div className="p-4">
          <h3 className="font-bold text-lg">Additional Info</h3>
          <p>Type: Normal</p>
          <p>Speed: 0</p>
          <p>Attack: 0</p>
          <p>Defense: 0</p>
          <p>Special-Attack: 0</p>
          <p>Special-Defense: 0</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
