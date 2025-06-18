const pokemonAnimation = enemyName => {
  const enemyUrl = `https://play.pokemonshowdown.com/sprites/gen5ani/${enemyName}.gif`;
  const enemyImg = <img src={enemyUrl} alt="" className="w-70 max-h-70 object-contain" />;
  return enemyImg;
};

function PokemonEnemy({ enemyName }) {
  return <div className="">{pokemonAnimation(enemyName)}</div>;
}

export default PokemonEnemy;
