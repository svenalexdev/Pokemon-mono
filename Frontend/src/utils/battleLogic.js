// import { logEffectiveness } from './logEffectiveness';

const typeEffective = {
  normal: {
    rock: 0.5,
    ghost: 0,
    steel: 0.5
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5
  },
  electric: {
    water: 2,
    grass: 0.5,
    electric: 0.5,
    ground: 0,
    dragon: 0.5
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2
  },
  ground: {
    normal: 1,
    fire: 2,
    grass: 0.5,
    electric: 2,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2
  },
  flying: {
    grass: 2,
    electric: 0.5,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5
  }
};

// //Get stat from API formate
// const getStat = (pokemon, statName) => {
//   const stat = pokemon.stats.find(s => s.stat.name === statName); //find stat where name match
//   return stat ? stat.base_stat : 1;
// };

// //Damage Calculator

// export const calculateDamage = (attacker, defender, move) => {
//   //const level = attacker.level || 50;
//   const movePower = move.power || 1;
//   const moveType = move.type.name;
//   const damageClass = move.damage_class.name;

//   if (!movePower || damageClass === 'status') return 0;

//   const attackerStat = damageClass === 'physical' ? getStat(attacker, 'attack') : getStat(attacker, 'special-attack');

//   const defenderStat = damageClass === 'physical' ? getStat(defender, 'defense') : getStat(defender, 'special-defense');

//   //for Base damage calculate

//   let baseDamage = 10;
//   //let baseDamage = (((1 * level) / 5 + 2) * movePower * (attckStat / defenseStat)) / 50 + 2;

//   //for effectiveness
//   let effectiveness = 1;
//   defender.type.forEach(deftype => {
//     // Ex = typeEffective['fire'].?(optional if movetype morethan one) ??(if there is no value than default 1)
//     const modifire = typeEffective[moveType]?.[deftype.type.name] ?? 1;
//     effectiveness *= modifire; //multiplies all modifire values
//   });

//   let damage = (attackerStat / defenderStat) * effectiveness * baseDamage;

//   //same type attack bonas
//   const attckerTypes = attacker.type.map(t => t.type.name);
//   if (attckerTypes.includes(moveType)) {
//     damage *= 1.5;
//   }

//   if (Math.random() < 0.1) {
//     damage *= 1.5;
//     console.log("It's crical hit!");
//   }

//   logEffectiveness(move.name, effectiveness);
//   return Math.floor(damage);
// };

export { typeEffective };
