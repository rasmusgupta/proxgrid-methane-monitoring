'use client';

import { useAuth } from '@/lib/auth';
import { useNavigation } from '@/contexts/NavigationContext';
import Image from 'next/image';
import { 
  ChartBarIcon, 
  GlobeAltIcon, 
  DocumentChartBarIcon, 
  ChatBubbleLeftRightIcon,
  UserIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onSignOut: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
  { id: 'map', label: 'Map', icon: GlobeAltIcon },
  { id: 'reporting', label: 'Reporting', icon: DocumentChartBarIcon },
  { id: 'communications', label: 'Communications', icon: ChatBubbleLeftRightIcon },
];

const bottomItems = [
  { id: 'user', label: 'User', icon: UserIcon },
  { id: 'settings', label: 'Settings', icon: CogIcon },
];

export default function Sidebar({ collapsed, onToggle, onSignOut }: SidebarProps) {
  const { activeView, setActiveView } = useNavigation();
  const { user } = useAuth();

  return (
    <div className="bg-gray-900/30 backdrop-blur-md border border-gray-400/20 rounded-r-xl shadow-lg h-full flex flex-col">
      {/* Header with Logo and Toggle */}
      <div className="p-4 border-b border-gray-400/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center justify-center">
              <Image
                src="/ProxGrid.png"
                alt="ProxGrid"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
          )}
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as any)}
            className={`w-full flex items-center ${collapsed ? 'justify-center p-3' : 'space-x-3 p-3'} rounded-lg transition-all duration-200 ${
              activeView === item.id
                ? 'bg-primary-600 text-white'
                : 'text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon className={`${collapsed ? 'w-7 h-7' : 'w-5 h-5'}`} aria-hidden="true" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-400/20 space-y-2">
        {bottomItems.map((item) => (
          <button
            key={item.id}
            onClick={() => item.id === 'user' ? onSignOut() : null}
            className={`w-full flex items-center ${collapsed ? 'justify-center p-3' : 'space-x-3 p-3'} rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200`}
          >
            <item.icon className={`${collapsed ? 'w-7 h-7' : 'w-5 h-5'}`} aria-hidden="true" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
        
        {!collapsed && user && (
          <div className="mt-4 p-3 bg-white/5 rounded-lg">
            <div className="text-white text-sm font-medium">{user.name}</div>
            <div className="text-gray-400 text-xs">{user.email}</div>
            <div className="text-gray-500 text-xs">{user.company}</div>
          </div>
        )}
      </div>
    </div>
  );
}