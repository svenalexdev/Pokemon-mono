import { useContext } from 'react';
import Context from '../../utils/Context';

const pokemonAnimation = aiPokemon => {
  const enemyUrl = `https://play.pokemonshowdown.com/sprites/gen5ani/${aiPokemon}.gif`;
  const enemyImg = <img src={enemyUrl} alt="" className="w-70 max-h-70 object-contain" />;
  return enemyImg;
};

function PokemonEnemy() {
  const { aiPokemon } = useContext(Context);
  return <div className="">{pokemonAnimation(aiPokemon.name)}</div>;
}

export default PokemonEnemy;
