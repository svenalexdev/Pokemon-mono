const battleLog = [];

const logEffectiveness = (moveName, effectiveness) => {
  if (effectiveness > 1) {
    battleLog.push(`Super effectivess! (${effectiveness}X) `);
  } else if (effectiveness < 1 && effectiveness > 0) {
    battleLog.push(`Not very effective (${effectiveness}X)`);
  } else if (effectiveness === 0) {
    battleLog.push(' Not effect');
  } else {
    battleLog.push('It hit!');
  }
};
export default logEffectiveness;
