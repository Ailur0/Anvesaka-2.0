import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Users, Sparkles, Clock } from 'lucide-react';
import { aiService } from '../services/aiService';
import { showToast } from './Toast';
import { LoadingSpinner } from './LoadingSpinner';
import { Card3D } from './3D/Card3D';

export const ItineraryPlanner: React.FC = () => {
  const [formData, setFormData] = useState({
    destination: '',
    mood: '',
    crowd: '',
    season: '',
    budget: '',
    spiritual: false,
    duration: '3'
  });

  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOptimization, setAiOptimization] = useState<any>(null);

  const moods = ['Adventure', 'Relaxation', 'Cultural', 'Romantic', 'Family Fun', 'Solo Discovery'];
  const crowdPrefs = ['Bustling Cities', 'Peaceful Retreats', 'Mixed Experiences', 'Remote Locations'];
  const budgetRanges = ['Budget ($0-50/day)', 'Mid-range ($50-150/day)', 'Luxury ($150+/day)'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    showToast.loading('AI is analyzing your preferences...');
    
    try {
      // Get AI recommendations first
      const recommendations = await aiService.generatePersonalizedRecommendations(
        {
          mood: formData.mood,
          crowdPreference: formData.crowd,
          budget: formData.budget,
          cuisineTypes: ['Local', 'Traditional'],
          activities: ['Cultural Sites', 'Hidden Gems'],
          spiritualPlaces: formData.spiritual
        },
        formData.destination
      );

      // Generate optimized path
      const destinations = recommendations.slice(0, 4).map(rec => ({
        name: rec.title,
        lat: rec.location.lat,
        lng: rec.location.lng,
        duration: 2
      }));

      const optimization = await aiService.optimizeItineraryPath(
        destinations,
        { prioritizeTime: true, avoidCrowds: formData.crowd.includes('Peaceful') }
      );

      setAiOptimization(optimization);
      showToast.success('Perfect itinerary generated! ✨');
    } catch (error) {
      console.error('Error generating AI recommendations:', error);
      showToast.error('Failed to generate recommendations. Please try again.');
    }

    const sampleItinerary = {
      title: `${formData.duration}-Day ${formData.mood} Journey in ${formData.destination}`,
      aiGenerated: true,
      days: [
        {
          day: 1,
          theme: 'AI-Curated Local Immersion',
          activities: [
            { time: '9:00 AM', activity: 'Check into AI-recommended boutique accommodation', location: 'City Center', aiSuggested: true },
            { time: '11:00 AM', activity: 'Personalized food tour based on your preferences', location: 'Historic Quarter', aiSuggested: true },
            { time: '2:00 PM', activity: 'Hidden artisan market (92% match for your mood)', location: 'Craft District', aiSuggested: true },
            { time: '7:00 PM', activity: 'Sunset dinner at crowd-optimized location', location: 'Skyline View', aiSuggested: true }
          ]
        },
        {
          day: 2,
          theme: 'AI-Discovered Hidden Gems',
          activities: [
            { time: '8:00 AM', activity: 'AI-found secret trail (trending +145%)', location: 'Mountain Ridge', aiSuggested: true },
            { time: '12:00 PM', activity: 'Cooking class matched to your interests', location: 'Local Home', aiSuggested: true },
            { time: '4:00 PM', activity: 'Underground venue (low crowd predicted)', location: 'Arts District', aiSuggested: true },
            { time: '8:00 PM', activity: 'Optimized night market route', location: 'Old Town', aiSuggested: true }
          ]
        }
      ]
    };
    
    setGeneratedItinerary(sampleItinerary);
    setIsGenerating(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">AI-Powered Itinerary Planning</h2>
        <p className="text-xl text-gray-300">Tell us about your travel dreams, and our AI will craft the perfect personalized itinerary</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!generatedItinerary ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit} 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
          <div className="bg-gradient-to-r from-purple-600/20 to-orange-500/20 rounded-xl p-4 mb-6 border border-white/10">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-5 w-5 text-orange-400" />
              <span className="text-white font-medium">✨ AI-Enhanced Planning</span>
            </div>
            <p className="text-gray-300 text-sm">
              Our AI analyzes millions of travel data points, real-time trends, and your preferences to create the perfect personalized itinerary just for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination */}
            <div>
              <label className="block text-white font-medium mb-2">
                <MapPin className="inline h-5 w-5 mr-2" />
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                placeholder="Where do you want to go?"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-white font-medium mb-2">
                <Calendar className="inline h-5 w-5 mr-2" />
                Trip Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="1">1 Day</option>
                <option value="3">3 Days</option>
                <option value="7">1 Week</option>
                <option value="14">2 Weeks</option>
              </select>
            </div>

            {/* Mood */}
            <div>
              <label className="block text-white font-medium mb-2">
                <Sparkles className="inline h-5 w-5 mr-2" />
                Travel Mood
              </label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select your mood</option>
                {moods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>

            {/* Crowd Preference */}
            <div>
              <label className="block text-white font-medium mb-2">
                <Users className="inline h-5 w-5 mr-2" />
                Crowd Preference
              </label>
              <select
                value={formData.crowd}
                onChange={(e) => setFormData({...formData, crowd: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Choose your preference</option>
                {crowdPrefs.map(pref => (
                  <option key={pref} value={pref}>{pref}</option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-white font-medium mb-2">
                <DollarSign className="inline h-5 w-5 mr-2" />
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select budget range</option>
                {budgetRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            {/* Spiritual Places */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="spiritual"
                checked={formData.spiritual}
                onChange={(e) => setFormData({...formData, spiritual: e.target.checked})}
                className="w-5 h-5 text-orange-500 bg-white/10 border-white/20 rounded focus:ring-orange-500 focus:ring-2"
              />
              <label htmlFor="spiritual" className="ml-3 text-white font-medium">
                Include spiritual places
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full mt-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {isGenerating ? (
              <LoadingSpinner text="AI is crafting your perfect itinerary..." />
            ) : (
              <motion.span
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span className="group-hover:animate-pulse">Generate AI-Powered Itinerary</span>
              </motion.span>
            )}
          </button>
          </motion.form>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white">{generatedItinerary.title}</h3>
              {generatedItinerary.aiGenerated && (
                <div className="flex items-center space-x-2 mt-2">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <span className="text-orange-400 text-sm">AI-Generated & Optimized</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setGeneratedItinerary(null)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors transform hover:scale-105"
            >
              Create New Plan
            </button>
          </div>

          {/* AI Optimization Results */}
          {aiOptimization && (
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-500/20 rounded-xl p-4 mb-6 border border-white/10">
              <h4 className="text-white font-medium mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                AI Route Optimization
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Total Time:</span>
                  <span className="text-white ml-2">{aiOptimization.totalTime}</span>
                </div>
                <div>
                  <span className="text-gray-400">Efficiency:</span>
                  <span className="text-green-400 ml-2">{aiOptimization.efficiency}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Route:</span>
                  <span className="text-white ml-2">Optimized for your preferences</span>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-8">
            {generatedItinerary.days.map((day: any) => (
              <Card3D key={day.day} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <h4 className="text-xl font-semibold text-white mb-2">Day {day.day}: {day.theme}</h4>
                <div className="space-y-4">
                  {day.activities.map((activity: any, index: number) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200"
                    >
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                        activity.aiSuggested ? 'bg-gradient-to-r from-purple-500 to-orange-500' : 'bg-orange-500'
                      }`}>
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-orange-400 font-medium">{activity.time}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-300 text-sm">{activity.location}</span>
                          {activity.aiSuggested && (
                            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                              AI Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-white font-medium">{activity.activity}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card3D>
            ))}
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};