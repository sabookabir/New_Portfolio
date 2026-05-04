import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
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
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-base-950 relative overflow-hidden">
      {/* Decorative Tech Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 border-l border-t border-primary/40"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border-r border-b border-primary/40"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <svg className="w-5 h-5 text-base-950" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
          </div>
          <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Secure Access</h1>
          <p className="text-surface-500 font-medium uppercase tracking-widest text-[10px]">Administrator Authentication System</p>
        </div>
        
        <div className="glass-card p-10 border-t-4 border-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
             <div className="text-[40px] font-black italic">LOGIN</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-surface-700"
                  placeholder="admin_id"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-surface-500 uppercase tracking-widest mb-2">Security Code</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-surface-700"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{error}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-4 text-sm uppercase tracking-[0.2em] italic"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
            
            <div className="flex items-center gap-4 py-2">
              <div className="h-px flex-grow bg-white/5"></div>
              <span className="text-[10px] font-bold text-surface-700 uppercase tracking-widest">Options</span>
              <div className="h-px flex-grow bg-white/5"></div>
            </div>

            <p className="text-center text-xs text-surface-500 font-medium">
              New Administrator? <Link to="/register" className="text-primary hover:underline font-bold uppercase tracking-widest ml-1">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
