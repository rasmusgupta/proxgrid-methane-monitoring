'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface FreeMapViewRef {
  searchLocation: (query: string) => Promise<void>;
}

// Simple tile-based map implementation
const FreeMapView = forwardRef<FreeMapViewRef>((props, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795, zoom: 4 });
  const [marker, setMarker] = useState<{ lat: number; lng: number; title: string } | null>(null);

  // Convert lat/lng to tile coordinates
  const latLngToTile = (lat: number, lng: number, zoom: number) => {
    const x = Math.floor((lng + 180) / 360 * Math.pow(2, zoom));
    const y = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
    return { x, y };
  };

  // Convert tile coordinates to lat/lng
  const tileToLatLng = (x: number, y: number, zoom: number) => {
    const lng = x / Math.pow(2, zoom) * 360 - 180;
    const n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
    const lat = 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
    return { lat, lng };
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        // Simple initialization - just mark as loaded
        setIsMapLoaded(true);
      } catch (error) {
        console.error('Map initialization error:', error);
        setError(error instanceof Error ? error.message : 'Failed to initialize map');
      }
    };

    initializeMap();
  }, []);

  // Generate tiles for the current view
  const generateTiles = () => {
    const tiles = [];
    const zoom = Math.max(1, Math.min(18, Math.round(mapCenter.zoom)));
    const centerTile = latLngToTile(mapCenter.lat, mapCenter.lng, zoom);
    
    const tilesAcross = 3;
    const tilesDown = 3;
    
    for (let y = -Math.floor(tilesDown/2); y <= Math.floor(tilesDown/2); y++) {
      for (let x = -Math.floor(tilesAcross/2); x <= Math.floor(tilesAcross/2); x++) {
        const tileX = centerTile.x + x;
        const tileY = centerTile.y + y;
        
        if (tileX >= 0 && tileY >= 0 && tileX < Math.pow(2, zoom) && tileY < Math.pow(2, zoom)) {
          tiles.push({
            x: tileX,
            y: tileY,
            zoom: zoom,
            key: `${zoom}-${tileX}-${tileY}`,
            style: {
              left: `${x * 256 + 256}px`,
              top: `${y * 256 + 256}px`,
            }
          });
        }
      }
    }
    
    return tiles;
  };

  // Handle map interactions
  const handleMapClick = (e: React.MouseEvent) => {
    // Simple zoom in on click
    setMapCenter(prev => ({ ...prev, zoom: Math.min(18, prev.zoom + 1) }));
  };

  const handleZoomIn = () => {
    setMapCenter(prev => ({ ...prev, zoom: Math.min(18, prev.zoom + 1) }));
  };

  const handleZoomOut = () => {
    setMapCenter(prev => ({ ...prev, zoom: Math.max(1, prev.zoom - 1) }));
  };

  // Expose search functionality through ref
  useImperativeHandle(ref, () => ({
    searchLocation: async (query: string) => {
      try {
        // Use Nominatim for geocoding (free OpenStreetMap service)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
        );
        
        if (!response.ok) {
          throw new Error('Search service unavailable');
        }
        
        const results = await response.json();
        
        if (results.length === 0) {
          throw new Error('Location not found');
        }
        
        const result = results[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        
        // Update map center and add marker
        setMapCenter({ lat, lng, zoom: 15 });
        setMarker({ lat, lng, title: result.display_name });
        
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Search failed');
      }
    }
  }));

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center card-glass p-8 max-w-md">
          <div className="text-red-400 text-lg font-semibold mb-2">Map Loading Failed</div>
          <p className="text-gray-300 text-sm mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const tiles = generateTiles();

  return (
    <div className="h-full w-full relative bg-slate-900">
      {/* Loading overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-[1000]">
          <div className="text-center card-glass p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white mb-2 font-medium">Loading Satellite Map...</p>
            <p className="text-gray-400 text-sm">Free OpenStreetMap</p>
          </div>
        </div>
      )}

      {isMapLoaded && (
        <>
          {/* Map Container */}
          <div 
            className="h-full w-full relative overflow-hidden cursor-pointer"
            onClick={handleMapClick}
          >
            {/* Tile Layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              {tiles.map(tile => (
                <img
                  key={tile.key}
                  src={`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${tile.zoom}/${tile.y}/${tile.x}`}
                  alt={`Map tile ${tile.x},${tile.y}`}
                  className="absolute w-64 h-64 object-cover"
                  style={tile.style}
                  onError={(e) => {
                    // Fallback to OpenStreetMap if Esri fails
                    const img = e.target as HTMLImageElement;
                    img.src = `https://tile.openstreetmap.org/${tile.zoom}/${tile.x}/${tile.y}.png`;
                  }}
                />
              ))}
            </div>

            {/* Marker */}
            {marker && (
              <div 
                className="absolute z-[900] transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
              >
                <div className="bg-red-500 w-4 h-4 rounded-full border-2 border-white shadow-lg"></div>
                <div className="bg-white text-gray-900 text-xs px-2 py-1 rounded shadow-lg mt-1 whitespace-nowrap max-w-xs truncate">
                  {marker.title}
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 z-[1000] space-y-2">
            <button
              onClick={handleZoomIn}
              className="block w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-lg shadow-lg font-bold text-lg transition-all"
            >
              +
            </button>
            <button
              onClick={handleZoomOut}
              className="block w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-lg shadow-lg font-bold text-lg transition-all"
            >
              -
            </button>
          </div>

          {/* Map Info */}
          <div className="absolute bottom-4 left-4 z-[1000] card-glass p-2">
            <div className="text-white text-xs">
              Zoom: {Math.round(mapCenter.zoom)} | 
              Lat: {mapCenter.lat.toFixed(4)} | 
              Lng: {mapCenter.lng.toFixed(4)}
            </div>
          </div>

          {/* Success indicator */}
          <div className="absolute bottom-4 right-4 card-glass p-3 z-[1000]">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-green-300 text-sm font-medium">Map Ready</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

FreeMapView.displayName = 'FreeMapView';

export default FreeMapView;