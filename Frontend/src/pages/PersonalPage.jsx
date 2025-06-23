import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function PersonalPage() {
  const [stats, setStats] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const savedUsername = localStorage.getItem('username');

    if (!userId) {
      toast.error('User not found. Please log in again.');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/battle-history/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch battle history');
        const data = await res.json();
        setStats(data);
        setUsername(savedUsername || 'Trainer');
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading your stats...</p>;
  if (!stats) return <p>No battle data found.</p>;

  return (
    <div className="min-h-screen bg-white text-black p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {username}</h1>
      <ul className="space-y-2">
        <li>Total Battles: {stats.totalBattles}</li>
        <li>Battles Won: {stats.battlesWon}</li>
        <li>Battles Lost: {stats.battlesLost}</li>
        <li>Best Streak: {stats.bestStreak}</li>
        <li>Best Brawler: {stats.bestBrawler || 'N/A'}</li>
      </ul>
    </div>
  );
}

export default PersonalPage;
