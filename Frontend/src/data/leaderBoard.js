const API_URL = import.meta.env.VITE_POKEMON_API;
if (!API_URL) throw new Error('API URL is required, are you missing a .env file?');
const baseURL = `${API_URL}/leaderboard`;

export const getLeaderboardEntry = async () => {
  const res = await fetch(baseURL);
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error('An error occurred while fetching leaderboard');
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const createLeaderboardEntry = async gameData => {
  const res = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData)
  });
  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error('An error occurred while send data on leaderboard');
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};

export const updateLeaderboardEntry = async (id, gameData) => {
  const res = await fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gameData),
    credentials: 'include'
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (!errorData.error) {
      throw new Error('An error occurred while updating the leaderboard');
    }
    throw new Error(errorData.error);
  }
  const data = await res.json();
  return data;
};