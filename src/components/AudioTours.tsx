import React, { useState } from 'react';
import { Play, Pause, Headphones, Volume2, Download, Clock, Globe } from 'lucide-react';

export const AudioTours: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

  const audioTours = [
    {
      id: 1,
      title: 'Secrets of the Colosseum',
      location: 'Rome, Italy',
      duration: '45 mins',
      category: 'Historical',
      narrator: 'Dr. Maria Fontana, Roman Historian',
      description: 'Discover the hidden chambers, gladiator stories, and engineering marvels of ancient Rome\'s greatest amphitheater.',
      image: 'https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg',
      listens: 12400,
      rating: 4.9,
      features: ['3D Audio', 'Offline Available', 'Multi-language']
    },
    {
      id: 2,
      title: 'Flavors of Old Bangkok',
      location: 'Bangkok, Thailand',
      category: 'Culinary',
      duration: '35 mins',
      narrator: 'Chef Siriporn Tuntiwechapikul',
      description: 'Follow the aromatic journey through street food stalls, learning about ingredients and traditional cooking methods.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      listens: 8600,
      rating: 4.7,
      features: ['Binaural Recording', 'Recipe Cards', 'Local Sounds']
    },
    {
      id: 3,
      title: 'Mystical Machu Picchu',
      location: 'Cusco, Peru',
      category: 'Spiritual',
      duration: '52 mins',
      narrator: 'Carlos Mamani, Quechua Elder',
      description: 'Uncover the spiritual significance and astronomical alignments of the lost city of the Incas.',
      image: 'https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg',
      listens: 15200,
      rating: 4.8,
      features: ['Traditional Music', 'Sacred Ceremonies', 'Stargazing Guide']
    },
    {
      id: 4,
      title: 'Jazz Souls of New Orleans',
      location: 'New Orleans, USA',
      category: 'Cultural',
      duration: '41 mins',
      narrator: 'Wynton Marsalis, Jazz Musician',
      description: 'Walk through the birthplace of jazz while live music and stories bring the culture to life.',
      image: 'https://images.pexels.com/photos/1540405/pexels-photo-1540405.jpeg',
      listens: 9800,
      rating: 4.9,
      features: ['Live Recordings', 'Music History', 'Street Performances']
    },
    {
      id: 5,
      title: 'Arctic Wilderness Stories',
      location: 'Svalbard, Norway',
      category: 'Nature',
      duration: '38 mins',
      narrator: 'Erik Hansen, Arctic Explorer',
      description: 'Experience the sounds and stories of the Arctic while learning about wildlife and survival.',
      image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
      listens: 6400,
      rating: 4.6,
      features: ['Wildlife Sounds', 'Aurora Guide', 'Survival Tips']
    },
    {
      id: 6,
      title: 'Temple Bells of Kyoto',
      location: 'Kyoto, Japan',
      category: 'Spiritual',
      duration: '46 mins',
      narrator: 'Master Takeshi Yamamoto',
      description: 'Meditative journey through ancient temples with bell ceremonies and zen philosophy.',
      image: 'https://images.pexels.com/photos/161815/temple-japan-kyoto-building-161815.jpeg',
      listens: 11200,
      rating: 4.8,
      features: ['Meditation Guide', 'Bell Ceremonies', 'Garden Sounds']
    }
  ];

  const categories = ['All', 'Historical', 'Culinary', 'Spiritual', 'Cultural', 'Nature'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTours = activeCategory === 'All' 
    ? audioTours 
    : audioTours.filter(tour => tour.category === activeCategory);

  const togglePlay = (tourId: number) => {
    setCurrentlyPlaying(currentlyPlaying === tourId ? null : tourId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Immersive Audio Tours</h2>
        <p className="text-xl text-gray-300">Let expert guides bring destinations to life through your headphones</p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeCategory === category
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Tour */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-orange-500/20 rounded-2xl p-8 mb-12 border border-white/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
      >
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-1/3">
            <motion.img
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.3 }}
              src={audioTours[0].image}
              alt={audioTours[0].title}
              className="w-full h-64 object-cover rounded-xl"
            />
          </div>
          <div className="w-full lg:w-2/3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
              <span className="text-gray-400 text-sm">{audioTours[0].category}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{audioTours[0].title}</h3>
            <div className="flex items-center text-gray-300 mb-4">
              <Globe className="h-4 w-4 mr-2" />
              <span>{audioTours[0].location}</span>
              <Clock className="h-4 w-4 ml-4 mr-2" />
              <span>{audioTours[0].duration}</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">{audioTours[0].description}</p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => togglePlay(audioTours[0].id)}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
              >
                {currentlyPlaying === audioTours[0].id ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
                <span>{currentlyPlaying === audioTours[0].id ? 'Pause' : 'Play Preview'}</span>
              </button>
              <button className="flex items-center space-x-2 bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors border border-white/20">
                <Download className="h-5 w-5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.slice(1).map((tour) => (
          <div
            key={tour.id}
            className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="relative h-48">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1">{tour.title}</h3>
                <div className="flex items-center text-gray-300 text-sm">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{tour.location}</span>
                </div>
              </div>
              <button
                onClick={() => togglePlay(tour.id)}
                className="absolute top-4 right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
              >
                {currentlyPlaying === tour.id ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                  {tour.category}
                </span>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{tour.duration}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{tour.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>By {tour.narrator}</span>
                <span>{tour.listens.toLocaleString()} listens</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {tour.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-white/10 text-white py-2 px-4 rounded-lg font-medium hover:bg-white/20 transition-colors border border-white/20">
                  <Headphones className="h-4 w-4 inline mr-2" />
                  Listen
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};