'use client';

import { useState, useRef } from 'react';
import { 
  GlobeAltIcon, 
  Cog6ToothIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';
import FreeMapView from './FreeMapView';
import MapSettingsPanel from './MapSettingsPanel';

export default function CleanMapView() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<{ searchLocation: (query: string) => Promise<void> }>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      await mapRef.current?.searchLocation(searchQuery);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Clean Top Bar */}
      <div className="bg-gray-900/50 backdrop-blur-md border-b border-gray-400/20 p-4">
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <div className="flex items-center space-x-3">
            <GlobeAltIcon className="w-6 h-6 text-blue-400" />
            <h2 className="text-white text-lg font-semibold">Satellite Map</h2>
          </div>

          {/* Center: Search Field */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="Search location..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isSearching}
              />
              <MagnifyingGlassIcon className={`absolute left-3 top-2.5 w-4 h-4 ${
                isSearching ? 'text-blue-400 animate-pulse' : 'text-gray-400'
              }`} />
              {isSearching && (
                <div className="absolute right-3 top-2.5">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </form>
          </div>

          {/* Right: Settings Cog */}
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isSettingsOpen 
                ? 'bg-blue-600/20 text-blue-400 shadow-lg' 
                : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30 hover:text-gray-300'
            }`}
            title="Map Settings"
          >
            <Cog6ToothIcon className={`w-5 h-5 transition-transform duration-200 ${
              isSettingsOpen ? 'rotate-45' : ''
            }`} />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <FreeMapView ref={mapRef} />
        
        {/* Settings Panel Overlay */}
        <MapSettingsPanel
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </div>
  );
}