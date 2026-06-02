import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Utensils } from 'lucide-react';
import { toast } from 'react-toastify';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  
  const signup = useAuthStore(state => state.signup);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.mobile || !formData.password) {
      toast.error('Please fill all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    signup({
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile
    });
    
    toast.success('Registration successful!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface-container p-8 rounded-2xl border border-surface-bright shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
            <Utensils size={32} />
          </div>
          <h2 className="text-3xl font-headline-md text-on-surface">Create Account</h2>
          <p className="text-on-surface-variant font-body-md mt-2">Join Savora for a premium dining experience</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
              placeholder="John Doe"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Mobile Number</label>
              <input 
                type="tel" 
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="9876543210"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block font-label-sm text-on-surface-variant uppercase mb-2">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-surface border border-surface-bright rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-primary text-on-primary py-3 mt-4 rounded-lg font-label-sm uppercase hover:bg-primary-fixed-dim transition-colors">
            Register Account
          </button>
        </form>

        <p className="mt-8 text-center text-on-surface-variant font-body-md">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
