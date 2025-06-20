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
      if (!email || !passoword) throw new Error('Fill all fields');
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
    return new Promise(res => setTimeout(() => res({ message: `Trainer ${email} registed` }), 1000));
  };

  return (
    <div>
      <div>
        <h1>Create an Account</h1>
        <form>
          <input type="text" placeholder="Email" className="" value={email} onChange={e => setEmail(e.target.value)} />
        </form>
      </div>
    </div>
  );
}
