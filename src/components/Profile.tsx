import React, { useState } from 'react';
import { User, MapPin, Star, Heart, Clock, Settings, Trophy, Globe } from 'lucide-react';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'preferences' | 'history'>('overview');

  const userStats = {
    tripsCompleted: 24,
    countriesVisited: 12,
    hiddenGemsDiscovered: 156,
    audioToursCompleted: 89,
    favoriteSpots: 34,
    totalMiles: 45230
  };

  const recentTrips = [
    {
      id: 1,
      destination: 'Kyoto, Japan',
      date: 'March 2024',
      duration: '7 days',
      rating: 5,
      image: 'https://images.pexels.com/photos/161815/temple-japan-kyoto-building-161815.jpeg',
      highlights: ['Golden Pavilion', 'Bamboo Forest', 'Traditional Tea Ceremony']
    },
    {
      id: 2,
      destination: 'Santorini, Greece',
      date: 'January 2024',
      duration: '5 days',
      rating: 4,
      image: 'https://images.pexels.com/photos/161901/santorini-travel-island-sunset-161901.jpeg',
      highlights: ['Sunset in Oia', 'Wine Tasting', 'Hidden Beach Caves']
    },
    {
      id: 3,
      destination: 'Machu Picchu, Peru',
      date: 'November 2023',
      duration: '10 days',
      rating: 5,
      image: 'https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg',
      highlights: ['Inca Trail Hike', 'Sacred Valley', 'Local Markets']
    }
  ];

  const preferences = {
    travelMood: 'Adventure',
    crowdPreference: 'Mixed Experiences',
    budgetRange: 'Mid-range ($50-150/day)',
    spiritualPlaces: true,
    cuisine: ['Local Street Food', 'Traditional', 'Vegetarian Options'],
    activities: ['Hiking', 'Cultural Sites', 'Photography', 'Local Markets']
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <User className="h-16 w-16 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
              <Trophy className="h-4 w-4 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">Alex Rivera</h1>
            <p className="text-gray-300 mb-4">Adventurous Explorer • Member since 2022</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{userStats.tripsCompleted}</div>
                <div className="text-sm text-gray-300">Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{userStats.countriesVisited}</div>
                <div className="text-sm text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.hiddenGemsDiscovered}</div>
                <div className="text-sm text-gray-300">Hidden Gems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{userStats.audioToursCompleted}</div>
                <div className="text-sm text-gray-300">Audio Tours</div>
              </div>
            </div>
          </div>

          <button className="bg-white/10 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20">
            <Settings className="h-5 w-5 inline mr-2" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20">
        {[
          { id: 'overview', label: 'Overview', icon: Globe },
          { id: 'preferences', label: 'Preferences', icon: Settings },
          { id: 'history', label: 'Trip History', icon: Clock }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Trips */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Recent Adventures</h3>
            <div className="space-y-4">
              {recentTrips.slice(0, 3).map((trip) => (
                <div key={trip.id} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-4">
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{trip.destination}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{trip.date}</span>
                        <span>•</span>
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(trip.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Achievements</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                <Trophy className="h-8 w-8 text-yellow-400" />
                <div>
                  <div className="text-white font-medium">Globe Trotter</div>
                  <div className="text-yellow-300 text-sm">Visited 10+ countries</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                <Heart className="h-8 w-8 text-green-400" />
                <div>
                  <div className="text-white font-medium">Hidden Gem Hunter</div>
                  <div className="text-green-300 text-sm">Discovered 100+ secret spots</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <MapPin className="h-8 w-8 text-blue-400" />
                <div>
                  <div className="text-white font-medium">Audio Explorer</div>
                  <div className="text-blue-300 text-sm">Completed 50+ audio tours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-8">Travel Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Travel Style</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Preferred Mood</label>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-white">{preferences.travelMood}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Crowd Preference</label>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-white">{preferences.crowdPreference}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Budget Range</label>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <span className="text-white">{preferences.budgetRange}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Interests</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Favorite Cuisines</label>
                  <div className="flex flex-wrap gap-2">
                    {preferences.cuisine.map((item, index) => (
                      <span key={index} className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Favorite Activities</label>
                  <div className="flex flex-wrap gap-2">
                    {preferences.activities.map((activity, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.spiritualPlaces}
                    readOnly
                    className="w-5 h-5 text-orange-500 bg-white/10 border-white/20 rounded focus:ring-orange-500 focus:ring-2"
                  />
                  <label className="ml-3 text-white">Include spiritual places</label>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-8 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
            Update Preferences
          </button>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          {recentTrips.map((trip) => (
            <div key={trip.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full md:w-48 h-32 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-xl font-bold text-white">{trip.destination}</h4>
                    <div className="flex items-center">
                      {[...Array(trip.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm mb-4">
                    <span>{trip.date}</span>
                    <span className="mx-2">•</span>
                    <span>{trip.duration}</span>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Trip Highlights:</h5>
                    <div className="flex flex-wrap gap-2">
                      {trip.highlights.map((highlight, index) => (
                        <span key={index} className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};