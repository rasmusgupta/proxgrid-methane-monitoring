'use client';

import { useState } from 'react';
import { XMarkIcon, MapIcon, GlobeAltIcon, EyeIcon } from '@heroicons/react/24/outline';

interface MapSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MapSettingsPanel({ isOpen, onClose }: MapSettingsPanelProps) {
  const [mapType, setMapType] = useState<'satellite' | 'hybrid' | 'terrain'>('satellite');
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [showScaleControl, setShowScaleControl] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Settings Panel */}
      <div className="absolute top-0 right-0 w-80 h-full bg-gray-900/95 backdrop-blur-md border-l border-gray-400/20 z-50 shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-400/20">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-lg font-semibold flex items-center space-x-2">
                <MapIcon className="w-5 h-5 text-blue-400" />
                <span>Map Settings</span>
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg transition-all"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            
            {/* Map Type */}
            <div className="space-y-3">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <GlobeAltIcon className="w-4 h-4 text-blue-400" />
                <span>Map Type</span>
              </h4>
              
              <div className="space-y-2">
                {[
                  { id: 'satellite', label: 'Satellite', description: 'High-resolution satellite imagery' },
                  { id: 'hybrid', label: 'Hybrid', description: 'Satellite with road labels' },
                  { id: 'terrain', label: 'Terrain', description: 'Topographical map view' }
                ].map(({ id, label, description }) => (
                  <label
                    key={id}
                    className={`block p-3 rounded-lg border cursor-pointer transition-all ${
                      mapType === id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600/50 bg-gray-800/30 hover:border-gray-500/70 hover:bg-gray-700/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="mapType"
                        value={id}
                        checked={mapType === id}
                        onChange={(e) => setMapType(e.target.value as any)}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="text-white text-sm font-medium">{label}</div>
                        <div className="text-gray-400 text-xs">{description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Display Options */}
            <div className="space-y-3">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <EyeIcon className="w-4 h-4 text-blue-400" />
                <span>Display Options</span>
              </h4>
              
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-600/50 hover:bg-gray-700/30 transition-all cursor-pointer">
                  <div>
                    <div className="text-white text-sm font-medium">Show Coordinates</div>
                    <div className="text-gray-400 text-xs">Display latitude/longitude on hover</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showCoordinates}
                    onChange={(e) => setShowCoordinates(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-600/50 hover:bg-gray-700/30 transition-all cursor-pointer">
                  <div>
                    <div className="text-white text-sm font-medium">Scale Control</div>
                    <div className="text-gray-400 text-xs">Show distance scale on map</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showScaleControl}
                    onChange={(e) => setShowScaleControl(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="text-white font-medium">Quick Actions</h4>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm font-medium transition-all">
                  Reset View
                </button>
                <button className="p-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm font-medium transition-all">
                  My Location
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-400/20">
            <div className="text-center text-xs text-gray-500">
              Powered by Google Maps
            </div>
          </div>
        </div>
      </div>
    </>
  );
}