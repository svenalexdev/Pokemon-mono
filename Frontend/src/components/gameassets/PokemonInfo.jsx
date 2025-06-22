import { useState } from 'react';
import HPBar from '../../assets/PokemonInfo.png';
import { useContext } from 'react';
import Context from '../../utils/Context';
import { useEffect } from 'react';

function PokemonInfo() {
  const { playerPokemon, winner } = useContext(Context);
  const [isHovered, setIsHovered] = useState(false);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (winner === 'player') {
      setLevel(prevLevel => {
        const newLevel = prevLevel + 1;
        localStorage.setItem('winningStreak', newLevel);
        return newLevel;
      });
    }
  }, [winner]);

  const playerHpPercentage = playerPokemon ? (playerPokemon.hp / playerPokemon.maxHp) * 100 : 100;

  const getHpBarColor = percentage => {
    if (percentage > 60) return 'bg-green-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative z-3" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={HPBar} alt="" className="w-120" />
      <div className="absolute text-[1.9rem] tracking-normal text-black bottom-24 left-18 capitalize">
        {playerPokemon.name}
      </div>
      <div className="absolute font-black text-[1.7rem] bottom-24 right-11">Lv.{level}</div>
      <div className="absolute top-16 right-9 w-56 -z-1">
        <div className="w-full bg-gray-300 h-10">
          <div
            className={`h-10 ${getHpBarColor(playerHpPercentage)} transition-all duration-500`}
            style={{ width: `${playerHpPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="absolute font-black text-[1.7rem] bottom-5 right-23">
        {' '}
        {playerPokemon.hp} / {playerPokemon.maxHp}
      </div>

      <div
        className={`
        absolute bottom-full left-17 w-[80%] bg-[#F8F8D8] border-5 border-[#506860] rounded-t-2xl
        overflow-hidden transition-all duration-300 ease-in-out
        ${isHovered ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'}
      `}
      >
        <div className="text-[1.2rem] p-4 pt-3">
          <p>Type: {playerPokemon.types.join(', ')}</p>
          <p>Speed: {playerPokemon.speed}</p>
          <p>Attack: {playerPokemon.attack}</p>
          <p>Defense: {playerPokemon.defense}</p>
          <p>Special-Attack: {playerPokemon.specialAttack}</p>
          <p>Special-Defense: {playerPokemon.specialDefense}</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
