'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

// Dynamic import to avoid SSR issues
const loadLeaflet = async () => {
  const L = await import('leaflet');
  
  // Fix for default markers
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
  
  return L;
};

interface LeafletMapViewRef {
  searchLocation: (query: string) => Promise<void>;
}

const LeafletMapView = forwardRef<LeafletMapViewRef>((props, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const currentMarkerRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return;

      try {
        // Load Leaflet CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        const L = await loadLeaflet();
        
        // Create the map
        const map = L.map(mapRef.current, {
          center: [39.8283, -98.5795], // Center of USA
          zoom: 4,
          zoomControl: true,
          scrollWheelZoom: true,
        });

        // Add satellite imagery layer (Esri World Imagery - Free!)
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 18,
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
        }).addTo(map);

        // Optional: Add labels overlay
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 18,
          attribution: ''
        }).addTo(map);

        mapInstanceRef.current = map;
        setIsMapLoaded(true);
      } catch (error) {
        console.error('Map initialization error:', error);
        setError(error instanceof Error ? error.message : 'Failed to initialize map');
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  // Expose search functionality through ref
  useImperativeHandle(ref, () => ({
    searchLocation: async (query: string) => {
      if (!mapInstanceRef.current) throw new Error('Map not initialized');
      
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
        
        // Import Leaflet for marker creation
        const L = await loadLeaflet();
        
        // Remove previous marker
        if (currentMarkerRef.current) {
          mapInstanceRef.current.removeLayer(currentMarkerRef.current);
        }
        
        // Add new marker
        currentMarkerRef.current = L.marker([lat, lng])
          .addTo(mapInstanceRef.current)
          .bindPopup(result.display_name)
          .openPopup();
        
        // Pan to location
        mapInstanceRef.current.setView([lat, lng], 15);
        
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

  return (
    <div className="h-full w-full relative">
      {/* Map Container */}
      <div ref={mapRef} className="h-full w-full" />
      
      {/* Loading overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-[1000]">
          <div className="text-center card-glass p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white mb-2 font-medium">Loading Satellite Map...</p>
            <p className="text-gray-400 text-sm">Free OpenStreetMap + Esri Imagery</p>
          </div>
        </div>
      )}
      
      {/* Success indicator */}
      {isMapLoaded && (
        <div className="absolute bottom-4 right-4 card-glass p-3 z-[1000]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-300 text-sm font-medium">Map Ready</span>
          </div>
        </div>
      )}
    </div>
  );
});

LeafletMapView.displayName = 'LeafletMapView';

export default LeafletMapView;