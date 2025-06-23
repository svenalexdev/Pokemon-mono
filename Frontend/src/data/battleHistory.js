const API_URL = import.meta.env.VITE_POKEMON_API;
if (!API_URL) throw new Error('API URL is required, are you missing a .env file?');
const baseURL = `${API_URL}/stats`;

export const getBattleHistory = async () => {
  const res = await fetch (`${baseURL}/me`);
  if (!res.ok) {
    const ErrorData = await res.json();
    if (!ErrorData.error) {
      throw new Error('An Error occurred while get history');
    }
    throw new Error(ErrorData.error);
  }
  const data = await res.json();
  return data;
};

export const createBattleHistory = async gameData => {
  const res = await fetch(`${baseURL}/init`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error('An error occurred while send data on battle history');
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};
