import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Star, MapPin, Filter, Heart, Camera } from 'lucide-react';
import { showToast } from './Toast';
import { Card3D } from './3D/Card3D';

export const DiscoverSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const hiddenGems = [
    {
      id: 1,
      name: 'Secret Moonbow Falls',
      location: 'Cumberland Falls, Kentucky',
      category: 'nature',
      rating: 4.8,
      description: 'One of the only places in the world where you can see a moonbow - a rainbow created by moonlight.',
      image: 'https://images.pexels.com/photos/1840595/pexels-photo-1840595.jpeg',
      userSubmitted: true,
      tags: ['waterfall', 'rare phenomenon', 'night viewing']
    },
    {
      id: 2,
      name: 'Underground Jazz Cavern',
      location: 'Prague, Czech Republic',
      category: 'culture',
      rating: 4.9,
      description: 'A hidden underground venue in medieval cellars where local musicians play intimate jazz sessions.',
      image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg',
      userSubmitted: false,
      tags: ['music', 'underground', 'authentic']
    },
    {
      id: 3,
      name: 'Floating Market at Dawn',
      location: 'Can Tho, Vietnam',
      category: 'culture',
      rating: 4.7,
      description: 'Experience the authentic floating market before tourists arrive, with local vendors selling fresh produce.',
      image: 'https://images.pexels.com/photos/1192671/pexels-photo-1192671.jpeg',
      userSubmitted: true,
      tags: ['market', 'local culture', 'dawn experience']
    },
    {
      id: 4,
      name: 'Glowing Beach Phenomenon',
      location: 'Mosquito Bay, Puerto Rico',
      category: 'nature',
      rating: 4.6,
      description: 'Bioluminescent waters that glow blue when disturbed - one of only five places in the world.',
      image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg',
      userSubmitted: false,
      tags: ['bioluminescence', 'rare', 'night swimming']
    },
    {
      id: 5,
      name: 'Rooftop Temple Garden',
      location: 'Bangkok, Thailand',
      category: 'spiritual',
      rating: 4.5,
      description: 'A peaceful temple garden hidden on a skyscraper rooftop, unknown to most tourists.',
      image: 'https://images.pexels.com/photos/161772/thailand-temple-sunset-161772.jpeg',
      userSubmitted: true,
      tags: ['temple', 'peaceful', 'rooftop']
    },
    {
      id: 6,
      name: 'Medieval Dinner Cave',
      location: 'Salzburg, Austria',
      category: 'food',
      rating: 4.8,
      description: 'Dine in a 15th-century cave restaurant that serves traditional Austrian cuisine by candlelight.',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
      userSubmitted: false,
      tags: ['medieval', 'cave dining', 'candlelight']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Gems', icon: Eye },
    { id: 'nature', label: 'Nature', icon: MapPin },
    { id: 'culture', label: 'Culture', icon: Camera },
    { id: 'spiritual', label: 'Spiritual', icon: Heart },
    { id: 'food', label: 'Food', icon: Star }
  ];

  const filteredGems = activeFilter === 'all' 
    ? hiddenGems 
    : hiddenGems.filter(gem => gem.category === activeFilter);

  const handleAddToItinerary = (gemName: string) => {
    showToast.success(`${gemName} added to your itinerary! ✨`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">Discover Hidden Gems</h2>
        <p className="text-xl text-gray-300">Explore secret places shared by our community of adventurers</p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05, y: -2, rotate: activeFilter === filter.id ? 0 : 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25 animate-pulse'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{filter.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Gems Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredGems.map((gem, index) => (
            <motion.div
              key={gem.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card3D className="group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={gem.image}
                    alt={gem.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {gem.userSubmitted && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium"
                      >
                        Community
                      </motion.div>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-medium">{gem.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {gem.name}
                    </h3>
                    <motion.button 
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Heart className="h-5 w-5" />
                    </motion.button>
                  </div>

                  <div className="flex items-center text-gray-400 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{gem.location}</span>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {gem.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {gem.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: tagIndex * 0.05 }}
                        className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToItinerary(gem.name)}
                    className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 group"
                  >
                    <span className="group-hover:animate-bounce">Add to Itinerary</span>
                  </motion.button>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Community Contribution CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <Card3D className="bg-gradient-to-r from-blue-600/20 to-orange-500/20 rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4">Know a Hidden Gem?</h3>
          <p className="text-gray-300 mb-6">
            Share your secret discoveries with our community of travelers and help others find magical places.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => showToast.custom('Feature coming soon! 🚀', '✨')}
            className="bg-white text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Share Your Discovery
          </motion.button>
        </Card3D>
      </motion.div>
    </motion.div>
  );
};