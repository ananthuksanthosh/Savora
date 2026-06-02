import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Utensils } from 'lucide-react';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    
    // Check if admin login
    if (email === 'admin@savora.com' && password === 'admin') {
      login(email, password, true);
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } else {
      login(email, password, false);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    }
  };

  const handleGoogleSignIn = () => {
    toast.info('Google Sign-In is simulated.');
    login('googleuser@example.com', 'dummy', false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container p-8 rounded-2xl border border-surface-bright shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <Utensils size={32} />
          </div>
          <h2 className="text-3xl font-headline-md text-on-surface">Welcome Back</h2>
          <p className="text-on-surface-variant font-body-md mt-2">Sign in to your Savora account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-on-surface-variant cursor-pointer">
              <input type="checkbox" className="accent-primary" />
              Remember Me
            </label>
            <button type="button" className="text-primary hover:underline">Forgot Password?</button>
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-sm uppercase hover:bg-primary-fixed-dim transition-colors">
            Sign In
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px bg-surface-bright flex-1"></div>
          <span className="text-on-surface-variant text-sm font-label-sm uppercase">OR</span>
          <div className="h-px bg-surface-bright flex-1"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full mt-6 bg-surface border border-surface-bright text-on-surface py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-surface-bright transition-colors font-body-md"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="mt-8 text-center text-on-surface-variant font-body-md">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
