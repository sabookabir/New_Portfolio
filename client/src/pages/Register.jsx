import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/auth/register', { username, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-base-950">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 text-white font-display uppercase tracking-tight">Join the <span className="text-primary">System</span></h1>
          <p className="text-surface-500">Create a new admin account</p>
        </div>
        
        <div className="card-premium p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-surface-400 uppercase tracking-widest mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-base-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="Choose username"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-surface-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-base-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="Create password"
                required
              />
            </div>
            
            {error && <p className="text-primary text-sm text-center">{error}</p>}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-4 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Create Account'}
            </button>
            
            <p className="text-center text-sm text-surface-500 mt-6">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
