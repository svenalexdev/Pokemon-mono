import { useContext } from 'react';
import Context from '../../utils/Context';
import { transformPokemonName } from '../../utils/transformPokemonName';

const pokemonAnimation = aiPokemon => {
  const enemyUrl = `https://play.pokemonshowdown.com/sprites/gen5ani/${aiPokemon}.gif`;
  const enemyImg = <img src={enemyUrl} alt="" className="w-70 max-h-70 object-contain" />;
  return enemyImg;
};

function PokemonEnemy() {
  const { aiPokemon, aiAnimation, playerAnimation, winner } = useContext(Context);
  return (
    <div className={`${aiAnimation ? '-translate-x-20' : ''} ${playerAnimation ? 'opacity-0' : ''}`}>
      <div
        className={`${winner === 'player' ? 'translate-y-70 opacity-0 transition-all duration-300 ease-in-out' : ''}`}
      >
        {pokemonAnimation(transformPokemonName(aiPokemon.name))}
      </div>
    </div>
  );
}

export default PokemonEnemy;
