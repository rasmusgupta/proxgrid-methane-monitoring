'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { EARTH_ENGINE_CONFIG } from '@/lib/earthEngine';

interface SimpleMapViewRef {
  searchLocation: (query: string) => Promise<void>;
}

const SimpleMapView = forwardRef<SimpleMapViewRef>((props, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return;

      try {
        // Load Google Maps
        const loader = new Loader({
          apiKey: EARTH_ENGINE_CONFIG.apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        await loader.load();
        
        // Create the map
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
          mapTypeId: 'satellite',
          mapTypeControl: true,
          zoomControl: true,
          scaleControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        });

        setMap(mapInstance);
        setIsMapLoaded(true);
      } catch (error) {
        console.error('Map initialization error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to initialize map';
        
        // Check for specific Google Maps API errors
        if (errorMessage.includes('ApiNotActivatedMapError') || window.location.href.includes('ApiNotActivatedMapError')) {
          setError('Google Maps API not activated. Please enable the Maps JavaScript API in Google Cloud Console for the API key.');
        } else {
          setError(errorMessage);
        }
      }
    };

    initializeMap();
  }, []);

  // Expose search functionality through ref
  useImperativeHandle(ref, () => ({
    searchLocation: async (query: string) => {
      if (!map) throw new Error('Map not initialized');
      
      const geocoder = new window.google.maps.Geocoder();
      
      return new Promise<void>((resolve, reject) => {
        geocoder.geocode({ address: query }, (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
          if (status === 'OK' && results && results.length > 0) {
            const location = results[0].geometry.location;
            map.setCenter(location);
            map.setZoom(15);
            
            // Add a marker for the searched location
            new window.google.maps.Marker({
              position: location,
              map: map,
              title: results[0].formatted_address,
            });
            
            resolve();
          } else {
            reject(new Error('Location not found'));
          }
        });
      });
    }
  }));

  if (error) {
    const isApiError = error.includes('API not activated');
    
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center card-glass p-8 max-w-lg">
          <div className="text-red-400 text-lg font-semibold mb-4">
            {isApiError ? 'Google Maps API Configuration Required' : 'Map Loading Failed'}
          </div>
          
          {isApiError ? (
            <div className="text-left space-y-4 mb-6">
              <p className="text-gray-300 text-sm">The Google Maps API key needs to be activated. Please follow these steps:</p>
              <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                <li>Go to <a href="https://console.cloud.google.com/" target="_blank" className="text-blue-400 underline">Google Cloud Console</a></li>
                <li>Select your project or create a new one</li>
                <li>Navigate to &quot;APIs &amp; Services&quot; → &quot;Library&quot;</li>
                <li>Search for and enable &quot;Maps JavaScript API&quot;</li>
                <li>Refresh this page</li>
              </ol>
              <div className="bg-gray-800/50 p-3 rounded border-l-4 border-yellow-400">
                <p className="text-yellow-300 text-xs">
                  <strong>Current API Key:</strong> AIzaSyAYRtoMwMWBiB6ECpYddixfiTHoMLSJ6Jg
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-300 text-sm mb-6">{error}</p>
          )}
          
          <div className="flex space-x-3">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Retry
            </button>
            {isApiError && (
              <a
                href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com"
                target="_blank"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Enable API
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      {/* Map Container */}
      <div ref={mapRef} className="h-full w-full" />
      
      {/* Loading overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center card-glass p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white mb-2 font-medium">Loading Satellite Map...</p>
            <p className="text-gray-400 text-sm">Basic Google Maps satellite view</p>
          </div>
        </div>
      )}
      
      {/* Success indicator */}
      {isMapLoaded && (
        <div className="absolute bottom-4 right-4 card-glass p-3 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-300 text-sm font-medium">Map Ready</span>
          </div>
        </div>
      )}
    </div>
  );
});

SimpleMapView.displayName = 'SimpleMapView';

export default SimpleMapView;