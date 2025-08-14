import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from './Toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const loadingToast = showToast.loading(isSignUp ? 'Creating your account...' : 'Signing you in...');

    try {
      let result;
      if (isSignUp) {
        result = await signUp(email, password, fullName);
      } else {
        result = await signIn(email, password);
      }

      if (result.error) {
        setError(result.error.message);
        showToast.error(result.error.message);
      } else {
        showToast.success(isSignUp ? 'Account created successfully!' : 'Welcome back!');
        onClose();
        setEmail('');
        setPassword('');
        setFullName('');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      showToast.error('An unexpected error occurred');
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const loadingToast = showToast.loading('Logging in with demo account...');
    
    try {
      const result = await signIn('demo@anvesaka.com', 'demo123');
      if (result.error) {
        showToast.error('Demo login failed. Please try again.');
      } else {
        showToast.success('Welcome to Anvesaka! Exploring with demo account.');
        onClose();
      }
    } catch (err) {
      showToast.error('Demo login failed. Please try again.');
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl"
        >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-white font-medium mb-2">
                <User className="inline h-4 w-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-white font-medium mb-2">
              <Mail className="inline h-4 w-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              <Lock className="inline h-4 w-4 mr-2" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10 group-hover:animate-pulse">
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </span>
          </button>
        </form>

        {/* Demo Account Section */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="text-center mb-4">
            <p className="text-gray-300 text-sm">Want to explore without signing up?</p>
          </div>
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10 group-hover:animate-pulse">
              {loading ? 'Processing...' : '✨ Try Demo Account'}
            </span>
          </button>
          <p className="text-gray-400 text-xs text-center mt-2">
            Full access to all features • No registration required
          </p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-300">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-400 hover:text-orange-300 ml-2 font-medium"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};