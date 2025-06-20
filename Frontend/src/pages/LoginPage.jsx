import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error('Fill all fields');
      setLoading(true);
      const { message } = await testSign({ email, password });
      toast.success(message || 'Welcome back trainer');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const testSign = ({ email }) => {
    return new Promise(res => setTimeout(() => res({ message: `Trainer ${email} logged in.` }), 1000));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 flex items-center justify-center text-black p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md relative">
        <h1 className="text-2xl font-bold mb-4">Login to Your Account</h1>
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 right-4 bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-700"
        >
          Back Home
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Email"
            className="p-2 border border-gray-300 rounded text-black"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-gray-300 rounded text-black"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
