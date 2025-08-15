import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Clock, DollarSign, Users, Shuffle, Star, Heart, Camera } from 'lucide-react';
import { showToast } from './Toast';
import { LoadingSpinner } from './LoadingSpinner';
import { Card3D } from './3D/Card3D';

interface SurpriseExperience {
  id: string;
  title: string;
  location: string;
  description: string;
  duration: string;
  budget: string;
  mood: string;
  image: string;
  highlights: string[];
  surpriseRating: number;
  uniqueFactors: string[];
  bestTime: string;
  crowdLevel: 'low' | 'medium' | 'high';
}

export const SurpriseMe: React.FC = () => {
  const [currentSurprise, setCurrentSurprise] = useState<SurpriseExperience | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [surpriseHistory, setSurpriseHistory] = useState<SurpriseExperience[]>([]);

  const surpriseExperiences: SurpriseExperience[] = [
    {
      id: '1',
      title: 'Midnight Bioluminescent Kayaking',
      location: 'Mosquito Bay, Puerto Rico',
      description: 'Paddle through glowing waters under the stars in one of the world\'s brightest bioluminescent bays. Every stroke creates a trail of blue light.',
      duration: '3 hours',
      budget: '$85 per person',
      mood: 'Magical Adventure',
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
      highlights: ['Bioluminescent plankton', 'Night kayaking', 'Star gazing', 'Photography'],
      surpriseRating: 9.2,
      uniqueFactors: ['Only 5 places worldwide', 'Best visibility on new moon nights', 'Eco-friendly experience'],
      bestTime: 'New moon nights, 8 PM - 11 PM',
      crowdLevel: 'low'
    },
    {
      id: '2',
      title: 'Underground Jazz in Medieval Cellars',
      location: 'Prague, Czech Republic',
      description: 'Discover a hidden jazz club in 14th-century cellars where local musicians play intimate sessions surrounded by ancient stone walls.',
      duration: '4 hours',
      budget: '$45 per person',
      mood: 'Cultural Immersion',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
      highlights: ['Live jazz music', 'Medieval architecture', 'Local musicians', 'Craft cocktails'],
      surpriseRating: 8.8,
      uniqueFactors: ['600-year-old venue', 'Local musicians only', 'No tourist groups'],
      bestTime: 'Thursday-Saturday, 9 PM onwards',
      crowdLevel: 'low'
    },
    {
      id: '3',
      title: 'Sunrise Hot Air Balloon Over Fairy Chimneys',
      location: 'Cappadocia, Turkey',
      description: 'Float above otherworldly rock formations as the sun rises, painting the landscape in golden hues while hundreds of balloons dance around you.',
      duration: '5 hours',
      budget: '$180 per person',
      mood: 'Breathtaking Wonder',
      image: 'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg',
      highlights: ['Hot air ballooning', 'Sunrise views', 'Unique geology', 'Champagne breakfast'],
      surpriseRating: 9.5,
      uniqueFactors: ['UNESCO World Heritage site', 'Perfect weather conditions', 'Photographer\'s paradise'],
      bestTime: 'April-October, 5 AM departure',
      crowdLevel: 'medium'
    },
    {
      id: '4',
      title: 'Secret Rooftop Temple Garden',
      location: 'Bangkok, Thailand',
      description: 'Meditate in a hidden temple garden 40 floors above the bustling city, known only to locals and accessible through an unmarked elevator.',
      duration: '2 hours',
      budget: '$25 per person',
      mood: 'Peaceful Retreat',
      image: 'https://images.pexels.com/photos/161772/thailand-temple-sunset-161772.jpeg',
      highlights: ['Hidden temple', 'City skyline views', 'Meditation session', 'Local blessing ceremony'],
      surpriseRating: 8.6,
      uniqueFactors: ['Unknown to tourists', 'Monk-guided meditation', 'Sunset timing perfect'],
      bestTime: 'Daily, 5 PM - 7 PM',
      crowdLevel: 'low'
    },
    {
      id: '5',
      title: 'Glow Worm Cave Dining Experience',
      location: 'Waitomo, New Zealand',
      description: 'Dine in a limestone cave illuminated by thousands of glow worms while enjoying a multi-course meal prepared by local chefs.',
      duration: '3.5 hours',
      budget: '$220 per person',
      mood: 'Unique Luxury',
      image: 'https://images.pexels.com/photos/1840595/pexels-photo-1840595.jpeg',
      highlights: ['Glow worm ceiling', 'Cave dining', 'Local cuisine', 'Natural acoustics'],
      surpriseRating: 9.1,
      uniqueFactors: ['Only cave restaurant worldwide', 'Seasonal availability', 'Michelin-recommended'],
      bestTime: 'March-November, 7 PM seating',
      crowdLevel: 'low'
    }
  ];

  const generateSurprise = async () => {
    setIsGenerating(true);
    showToast.loading('AI is finding your perfect surprise adventure...');

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Select a random experience that hasn't been shown recently
    const availableExperiences = surpriseExperiences.filter(
      exp => !surpriseHistory.slice(-2).some(hist => hist.id === exp.id)
    );
    
    const randomExperience = availableExperiences[
      Math.floor(Math.random() * availableExperiences.length)
    ];

    setCurrentSurprise(randomExperience);
    setSurpriseHistory(prev => [...prev, randomExperience]);
    setIsGenerating(false);
    
    showToast.success(`✨ Surprise! We found an amazing ${randomExperience.mood.toLowerCase()} experience for you!`);
  };

  const acceptSurprise = () => {
    if (currentSurprise) {
      showToast.success(`🎉 ${currentSurprise.title} added to your itinerary! Get ready for an unforgettable experience!`);
    }
  };

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-400 bg-green-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'high': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center items-center mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-orange-500/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20"
          >
            <Sparkles className="h-6 w-6 text-orange-400" />
            <span className="text-white font-medium">AI-Powered Surprise Generator</span>
          </motion.div>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4">Surprise Me!</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Let our AI discover unique, spontaneous experiences tailored just for you. 
          From hidden gems to once-in-a-lifetime adventures!
        </p>
      </motion.div>

      {/* Generate Button */}
      <div className="text-center mb-12">
        <motion.button
          onClick={generateSurprise}
          disabled={isGenerating}
          whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden animate-pulse"
        >
          {isGenerating ? (
            <LoadingSpinner text="Finding your surprise..." />
          ) : (
            <motion.span className="flex items-center space-x-3">
              <Shuffle className="h-6 w-6" />
              <span>Generate My Surprise</span>
              <Sparkles className="h-6 w-6" />
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Surprise Experience Display */}
      <AnimatePresence mode="wait">
        {currentSurprise && (
          <motion.div
            key={currentSurprise.id}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <Card3D className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={currentSurprise.image}
                  alt={currentSurprise.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Surprise Rating */}
                <div className="absolute top-6 right-6">
                  <div className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">{currentSurprise.surpriseRating}/10</span>
                  </div>
                </div>

                {/* Title and Location */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    {currentSurprise.title}
                  </motion.h3>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center text-gray-300"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{currentSurprise.location}</span>
                  </motion.div>
                </div>
              </div>

              <div className="p-8">
                {/* Mood Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-orange-500/20 text-orange-300 px-4 py-2 rounded-full mb-6 border border-orange-500/30"
                >
                  <Heart className="h-4 w-4" />
                  <span className="font-medium">{currentSurprise.mood}</span>
                </motion.div>

                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-300 text-lg leading-relaxed mb-6"
                >
                  {currentSurprise.description}
                </motion.p>

                {/* Details Grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
                >
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-medium">{currentSurprise.duration}</div>
                    <div className="text-gray-400 text-sm">Duration</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <div className="text-white font-medium">{currentSurprise.budget}</div>
                    <div className="text-gray-400 text-sm">Budget</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <Users className={`h-6 w-6 mx-auto mb-2 ${getCrowdLevelColor(currentSurprise.crowdLevel).split(' ')[0]}`} />
                    <div className="text-white font-medium capitalize">{currentSurprise.crowdLevel}</div>
                    <div className="text-gray-400 text-sm">Crowd Level</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <Camera className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-white font-medium">Epic</div>
                    <div className="text-gray-400 text-sm">Photo Ops</div>
                  </div>
                </motion.div>

                {/* Highlights */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-6"
                >
                  <h4 className="text-white font-semibold mb-3">Experience Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentSurprise.highlights.map((highlight, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Unique Factors */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-purple-600/20 to-orange-500/20 rounded-xl p-4 mb-6 border border-white/10"
                >
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-orange-400" />
                    What Makes This Special:
                  </h4>
                  <ul className="space-y-1">
                    {currentSurprise.uniqueFactors.map((factor, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-center">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Best Time */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-white/5 rounded-xl p-4 mb-8"
                >
                  <h4 className="text-white font-semibold mb-2">Best Time to Experience:</h4>
                  <p className="text-gray-300">{currentSurprise.bestTime}</p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                >
                  <button
                    onClick={acceptSurprise}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:rotate-1"
                  >
                    <Heart className="h-4 w-4 inline mr-2" />
                    I'm In! Add to Itinerary
                  </button>
                  <button
                    onClick={generateSurprise}
                    className="flex-1 bg-white/10 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 transform hover:scale-[1.02] hover:-rotate-1"
                  >
                    <Shuffle className="h-4 w-4 inline mr-2" />
                    Try Another Surprise
                  </button>
                </motion.div>
              </div>
            </Card3D>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Surprise History */}
      {surpriseHistory.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Surprise History</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surpriseHistory.slice(-6).reverse().map((surprise, index) => (
              <Card3D key={`${surprise.id}-${index}`} className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300">
                <img
                  src={surprise.image}
                  alt={surprise.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-white font-medium text-sm mb-1">{surprise.title}</h4>
                  <p className="text-gray-400 text-xs">{surprise.location}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-orange-400 text-xs">{surprise.mood}</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-yellow-400 text-xs">{surprise.surpriseRating}</span>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};