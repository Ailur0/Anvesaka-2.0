import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Star, 
  TrendingUp, 
  Clock, 
  Users, 
  Heart,
  Compass,
  Camera,
  Award,
  Zap,
  Globe
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card3D } from './3D/Card3D';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { icon: MapPin, label: 'Places Visited', value: '12', color: 'text-blue-400' },
    { icon: Calendar, label: 'Trips Planned', value: '8', color: 'text-green-400' },
    { icon: Star, label: 'Hidden Gems Found', value: '24', color: 'text-yellow-400' },
    { icon: Heart, label: 'Favorites', value: '16', color: 'text-red-400' }
  ];

  const quickActions = [
    { icon: Compass, label: 'Plan New Trip', color: 'bg-gradient-to-r from-blue-500 to-purple-600' },
    { icon: Zap, label: 'Surprise Me', color: 'bg-gradient-to-r from-orange-500 to-red-600' },
    { icon: Globe, label: 'Discover Places', color: 'bg-gradient-to-r from-green-500 to-teal-600' },
    { icon: Camera, label: 'Audio Tours', color: 'bg-gradient-to-r from-purple-500 to-pink-600' }
  ];

  const recentActivities = [
    { action: 'Planned a trip to Tokyo', time: '2 hours ago', icon: Calendar },
    { action: 'Discovered hidden gem in Paris', time: '1 day ago', icon: Star },
    { action: 'Completed audio tour of Rome', time: '3 days ago', icon: Camera },
    { action: 'Added Santorini to favorites', time: '1 week ago', icon: Heart }
  ];

  const upcomingTrips = [
    { destination: 'Tokyo, Japan', date: 'Dec 15-22', status: 'Confirmed', image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { destination: 'Bali, Indonesia', date: 'Jan 10-17', status: 'Planning', image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome back, <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">{user?.name || 'Explorer'}</span>!
          </h1>
          <p className="text-xl text-gray-300">Ready for your next adventure?</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <Card3D key={index}>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            </Card3D>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-400" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Card3D key={index}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full ${action.color} rounded-xl p-6 text-white font-semibold text-lg flex items-center justify-center space-x-3 hover:shadow-2xl transition-all duration-300`}
                  >
                    <action.icon className="w-6 h-6" />
                    <span>{action.label}</span>
                  </motion.button>
                </Card3D>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-blue-400" />
              Recent Activity
            </h2>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <activity.icon className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upcoming Trips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-green-400" />
            Upcoming Trips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingTrips.map((trip, index) => (
              <Card3D key={index}>
                <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20">
                  <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${trip.image})` }}>
                    <div className="h-full bg-black/30 flex items-end p-4">
                      <div>
                        <h3 className="text-white font-bold text-xl">{trip.destination}</h3>
                        <p className="text-gray-200">{trip.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      trip.status === 'Confirmed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-purple-400" />
            AI Travel Insights
          </h2>
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-xl p-6 border border-purple-500/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Travel Streak</h3>
                <p className="text-2xl font-bold text-yellow-400">15 days</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Explorer Rank</h3>
                <p className="text-2xl font-bold text-blue-400">Gold</p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Next Suggestion</h3>
                <p className="text-2xl font-bold text-green-400">Iceland</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};