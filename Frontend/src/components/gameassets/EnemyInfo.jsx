import { useState } from 'react';
import HPBarEnemy from '../../assets/EnemyInfo.png';
import { useContext } from 'react';
import Context from '../../utils/Context';
import { capitalizePokemonName } from '../../utils/transformPokemonName';

function EnemyInfo() {
  const { aiPokemon } = useContext(Context);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={HPBarEnemy} alt="" className="w-120" />
      <div className="absolute text-[2.05rem] tracking-normal text-black bottom-17 left-8">
        {capitalizePokemonName(aiPokemon.name)}
      </div>
      <div className="absolute font-black text-[1.7rem] top-5 right-23">
        {' '}
        {aiPokemon.hp} / {aiPokemon.maxHp}
      </div>
      <div
        className={`
        absolute top-30 left-0 w-110 bg-blue-100 border-2 border-blue-300 rounded-b-lg
        overflow-hidden transition-all duration-300 ease-in-out
        ${isHovered ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'}
      `}
      >
        <div className="p-4">
          <h3 className="font-bold text-lg">Additional Info</h3>
          <p>Base HP: {aiPokemon.hp}</p>
          <p>Type: {aiPokemon.types}</p>
          <p>Speed: {aiPokemon.speed}</p>
          <p>Attack: {aiPokemon.attack}</p>
          <p>Defense: {aiPokemon.defense}</p>
          <p>Special-Attack: {aiPokemon.specialAttack}</p>
          <p>Special-Defense: {aiPokemon.specialDefense}</p>
        </div>
      </div>
    </div>
  );
}

export default EnemyInfo;
