import { useContext } from 'react';
import Context from '../../utils/Context';
import { transformPokemonName } from '../../utils/transformPokemonName';

const pokemonAnimation = myPokemonName => {
  const enemyUrl = `https://play.pokemonshowdown.com/sprites/gen5ani-back/${myPokemonName}.gif`;
  const enemyImg = <img src={enemyUrl} alt="" className="w-70 max-h-70 object-contain" />;
  return enemyImg;
};

function PokemonTrainer() {
  const { playerPokemon, playerAnimation, aiAnimation, winner } = useContext(Context);

  return (
    <div className={`${playerAnimation ? 'translate-x-20' : ''} ${aiAnimation ? 'opacity-0' : ''}`}>
      <div className={`${winner === 'ai' ? 'translate-y-70 opacity-0 transition-all duration-300 ease-in-out' : ''}`}>
        {pokemonAnimation(transformPokemonName(playerPokemon.name))}
      </div>
    </div>
  );
}

export default PokemonTrainer;
