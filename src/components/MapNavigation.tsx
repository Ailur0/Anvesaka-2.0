import React, { useState } from 'react';
import { Navigation, MapPin, Clock, Route, Compass, Wifi, WifiOff } from 'lucide-react';

export const MapNavigation: React.FC = () => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const nearbyLandmarks = [
    {
      id: 1,
      name: 'Hidden Cave Entrance',
      distance: '200m',
      type: 'Natural Wonder',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      description: 'Ancient cave with stunning rock formations',
      estimatedTime: '5 mins walk'
    },
    {
      id: 2,
      name: 'Secret Viewpoint',
      distance: '450m',
      type: 'Scenic View',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      description: 'Panoramic city view known only to locals',
      estimatedTime: '12 mins walk'
    },
    {
      id: 3,
      name: 'Traditional Tea House',
      distance: '320m',
      type: 'Cultural Site',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      description: 'Authentic tea ceremony experience',
      estimatedTime: '8 mins walk'
    },
    {
      id: 4,
      name: 'Underground Jazz Club',
      distance: '680m',
      type: 'Entertainment',
      coordinates: { lat: 40.7614, lng: -73.9776 },
      description: 'Live music venue in historic basement',
      estimatedTime: '15 mins walk'
    }
  ];

  const currentItinerary = [
    { time: '9:00 AM', location: 'Morning Coffee Spot', status: 'completed' },
    { time: '10:30 AM', location: 'Hidden Cave Entrance', status: 'current' },
    { time: '12:00 PM', location: 'Traditional Tea House', status: 'upcoming' },
    { time: '2:30 PM', location: 'Secret Viewpoint', status: 'upcoming' },
    { time: '6:00 PM', location: 'Underground Jazz Club', status: 'upcoming' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Micro Map Navigation</h2>
        <p className="text-xl text-gray-300">Precise navigation to unique landmarks and hidden gems</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map View */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Live Navigation</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsOfflineMode(!isOfflineMode)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isOfflineMode
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {isOfflineMode ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
                  <span>{isOfflineMode ? 'Offline' : 'Online'}</span>
                </button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  <Compass className="h-4 w-4 inline mr-2" />
                  Calibrate
                </button>
              </div>
            </div>

            {/* Mock Map Interface */}
            <div className="relative bg-gradient-to-br from-green-800/20 to-blue-800/20 rounded-xl h-96 overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              
              {/* Current Location */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                <div className="absolute -top-2 -left-2 w-8 h-8 border-2 border-blue-500 rounded-full animate-ping"></div>
              </div>

              {/* Landmarks */}
              {nearbyLandmarks.map((landmark, index) => (
                <div
                  key={landmark.id}
                  className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 ${
                    index === 0 ? 'top-1/4 right-1/3' :
                    index === 1 ? 'top-1/6 left-1/4' :
                    index === 2 ? 'bottom-1/3 right-1/4' :
                    'bottom-1/4 left-1/3'
                  }`}
                  onClick={() => setSelectedLocation(landmark)}
                >
                  <div className="relative">
                    <MapPin className="h-6 w-6 text-orange-500 drop-shadow-lg" />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {landmark.name}
                    </div>
                  </div>
                </div>
              ))}

              {/* Distance Indicators */}
              <div className="absolute top-4 left-4 space-y-2">
                {nearbyLandmarks.slice(0, 2).map((landmark) => (
                  <div
                    key={landmark.id}
                    className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <Navigation className="h-3 w-3" />
                    <span>{landmark.distance} to {landmark.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Location Details */}
          {selectedLocation && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h4 className="text-xl font-bold text-white mb-2">{selectedLocation.name}</h4>
              <div className="flex items-center space-x-4 text-gray-300 mb-4">
                <span className="flex items-center">
                  <Navigation className="h-4 w-4 mr-1" />
                  {selectedLocation.distance}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {selectedLocation.estimatedTime}
                </span>
                <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-sm">
                  {selectedLocation.type}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{selectedLocation.description}</p>
              <div className="flex space-x-3">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  <Route className="h-4 w-4 inline mr-2" />
                  Navigate Here
                </button>
                <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                  Add to Itinerary
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Itinerary Sidebar */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              {currentItinerary.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    item.status === 'completed' ? 'bg-green-500/20 border border-green-500/30' :
                    item.status === 'current' ? 'bg-orange-500/20 border border-orange-500/30' :
                    'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'current' ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{item.time}</div>
                    <div className="text-sm text-gray-300">{item.location}</div>
                  </div>
                  {item.status === 'current' && (
                    <div className="text-orange-400 text-xs font-medium">Current</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Landmarks */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Nearby Landmarks</h3>
            <div className="space-y-3">
              {nearbyLandmarks.map((landmark) => (
                <div
                  key={landmark.id}
                  className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setSelectedLocation(landmark)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium text-sm">{landmark.name}</span>
                    <span className="text-orange-400 text-sm">{landmark.distance}</span>
                  </div>
                  <div className="text-gray-400 text-xs">{landmark.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Offline Maps */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Offline Maps</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white text-sm">Current Area</span>
                <span className="text-green-400 text-sm">Downloaded</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white text-sm">Tomorrow's Route</span>
                <button className="text-orange-400 text-sm hover:text-orange-300">Download</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};