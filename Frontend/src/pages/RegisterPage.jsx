import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      if (!email || !password) throw new Error('Fill all fields');
      setLoading(true);
      const { message } = await testRegister({ email, password });
      toast.success(message || 'Account created successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = ({ email }) => {
    return new Promise(res => setTimeout(() => res({ message: `Trainer ${email} registered` }), 1000));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 flex items-center justify-center text-black p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 text-sm rounded hover:bg-indigo-700"
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
            {loading ? 'Please wait...' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <button className="text-indigo-600 hover:underline" onClick={() => navigate('/login')}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
