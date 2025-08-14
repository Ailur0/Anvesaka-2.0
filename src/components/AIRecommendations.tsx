import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, MapPin, Clock, Star, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { aiService, AIRecommendation, TrendAnalysis } from '../services/aiService';

interface AIRecommendationsProps {
  userPreferences?: any;
  currentLocation?: string;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({ 
  userPreferences, 
  currentLocation = "Current Location" 
}) => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [trends, setTrends] = useState<TrendAnalysis | null>(null);
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'trends' | 'smart'>('recommendations');

  useEffect(() => {
    loadAIData();
  }, [userPreferences, currentLocation]);

  const loadAIData = async () => {
    setLoading(true);
    try {
      const [recs, trendsData, suggestions] = await Promise.all([
        aiService.generatePersonalizedRecommendations(
          userPreferences || {
            mood: 'Adventure',
            crowdPreference: 'Mixed Experiences',
            budget: 'Mid-range',
            cuisineTypes: ['Local', 'Traditional'],
            activities: ['Cultural Sites', 'Hidden Gems'],
            spiritualPlaces: false
          },
          currentLocation
        ),
        aiService.analyzeTravelTrends(currentLocation),
        aiService.generateSmartSuggestions(
          currentLocation,
          new Date().getHours() < 12 ? 'morning' : 'afternoon',
          'sunny',
          'exploratory'
        )
      ]);

      setRecommendations(recs);
      setTrends(trendsData);
      setSmartSuggestions(suggestions);
    } catch (error) {
      console.error('Error loading AI data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (recommendationId: string, isPositive: boolean) => {
    await aiService.learnFromUserFeedback(
      recommendationId,
      isPositive ? 5 : 2,
      isPositive ? 'Helpful recommendation' : 'Not relevant'
    );
    // Update UI to show feedback was recorded
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hidden_gem': return <Sparkles className="h-5 w-5" />;
      case 'restaurant': return <MapPin className="h-5 w-5" />;
      case 'activity': return <Clock className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hidden_gem': return 'text-purple-400 bg-purple-500/20';
      case 'restaurant': return 'text-green-400 bg-green-500/20';
      case 'activity': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-orange-400 bg-orange-500/20';
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="flex items-center justify-center space-x-3">
          <Brain className="h-8 w-8 text-orange-400 animate-pulse" />
          <div className="text-white text-lg">AI is analyzing your preferences...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-orange-500/20 rounded-2xl p-6 border border-white/20">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-8 w-8 text-orange-400" />
          <h2 className="text-2xl font-bold text-white">AI-Powered Insights</h2>
        </div>
        <p className="text-gray-300">
          Personalized recommendations based on your preferences, travel history, and real-time data analysis.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20">
        {[
          { id: 'recommendations', label: 'Smart Recommendations', icon: Brain },
          { id: 'trends', label: 'Travel Trends', icon: TrendingUp },
          { id: 'smart', label: 'Live Suggestions', icon: Sparkles }
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
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(rec.type)}`}>
                    {getTypeIcon(rec.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{rec.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span className="capitalize">{rec.type.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{Math.round(rec.confidence * 100)}% match</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleFeedback(rec.id, true)}
                    className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleFeedback(rec.id, false)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{rec.description}</p>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Brain className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-300 text-sm">{rec.reasoning}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Location</div>
                  <div className="text-white text-sm">{rec.location.address}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Estimated Cost</div>
                  <div className="text-white text-sm">{rec.estimatedCost}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Best Time</div>
                  <div className="text-white text-sm">{rec.bestTimeToVisit}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Tags</div>
                  <div className="flex flex-wrap gap-1">
                    {rec.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Add to Itinerary
                </button>
                <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'trends' && trends && (
        <div className="space-y-6">
          {/* Emerging Destinations */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
              Emerging Destinations
            </h3>
            <div className="space-y-4">
              {trends.emergingDestinations.map((dest, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">{dest.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 text-sm">+{dest.growthRate}%</span>
                      <span className="text-gray-400 text-sm">{dest.socialMentions.toLocaleString()} mentions</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dest.uniqueFactors.map((factor, i) => (
                      <span key={i} className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crowd Levels */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Real-time Crowd Analysis</h3>
            <div className="space-y-3">
              {trends.crowdLevels.map((crowd, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white">{crowd.location}</span>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      crowd.currentLevel === 'low' ? 'bg-green-500/20 text-green-300' :
                      crowd.currentLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {crowd.currentLevel}
                    </span>
                    <span className="text-gray-400 text-sm">{crowd.prediction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'smart' && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
            Live Smart Suggestions
          </h3>
          <div className="space-y-3">
            {smartSuggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">{suggestion}</p>
              </div>
            ))}
          </div>
          <button
            onClick={loadAIData}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Refresh Suggestions
          </button>
        </div>
      )}
    </div>
  );
};