'use client';

import { useNavigation } from '@/contexts/NavigationContext';
import Dashboard from './Dashboard';
import CleanMapView from './map/CleanMapView';

export default function AppContent() {
  const { activeView } = useNavigation();

  const renderContent = () => {
    switch (activeView) {
      case 'map':
        return <CleanMapView />;
      case 'reporting':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-white text-lg font-semibold mb-2">Reporting Module</h3>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          </div>
        );
      case 'communications':
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-white text-lg font-semibold mb-2">Communications Module</h3>
              <p className="text-gray-400">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return renderContent();
}