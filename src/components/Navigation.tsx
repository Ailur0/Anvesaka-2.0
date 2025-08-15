import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Headphones, Navigation as NavigationIcon, User, Map, Brain, LogIn, LogOut, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from './Toast';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: any) => void;
  onAuthClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange, onAuthClick }) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    showToast.success('Signed out successfully. See you next time! 👋');
  };
  const navItems = [
    { id: 'home', label: 'Home', icon: Compass, requiresAuth: false },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresAuth: true },
    { id: 'itinerary', label: 'Plan', icon: MapPin, requiresAuth: true },
    { id: 'discover', label: 'Discover', icon: NavigationIcon, requiresAuth: true },
    { id: 'surprise', label: 'Surprise Me', icon: Sparkles, requiresAuth: true },
    { id: 'audio', label: 'Audio Tours', icon: Headphones, requiresAuth: true },
    { id: 'map', label: 'Navigate', icon: Map, requiresAuth: true },
    { id: 'ai', label: 'AI Insights', icon: Brain, requiresAuth: true },
    { id: 'profile', label: 'Profile', icon: User, requiresAuth: true },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onSectionChange('home')}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="h-8 w-8 text-orange-400" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Anvesaka
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.filter(item => (!item.requiresAuth || user) && !(item.id === 'home' && user)).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => item.requiresAuth && !user ? onAuthClick() : onSectionChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              );
            })}
            
            {/* Auth Button */}
            <div className="ml-4 pl-4 border-l border-white/20">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="text-white text-sm">
                    {user.user_metadata?.full_name || user.email}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Sign Out</span>
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAuthClick}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm font-medium">Sign In</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <NavigationIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};