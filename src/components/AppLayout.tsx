'use client';

import { useState, ReactNode } from 'react';
import { useAuth } from '@/lib/auth';
import { NavigationProvider } from '@/contexts/NavigationContext';
import Sidebar from './Sidebar';
import AIPanel from './AIPanel';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const { signOut } = useAuth();

  return (
    <NavigationProvider>
      <div className="h-screen gradient-bg overflow-hidden">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className={`transition-all duration-300 ${leftPanelCollapsed ? 'w-20' : 'w-80'} flex-shrink-0`}>
            <div className="h-full pt-4 pb-4 pr-1">
              <Sidebar 
                collapsed={leftPanelCollapsed}
                onToggle={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
                onSignOut={signOut}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-4 px-2">
            <div className="card-glass card-hover h-full overflow-hidden">
              {children}
            </div>
          </div>

          {/* Right AI Panel */}
          <div className={`transition-all duration-300 ${rightPanelCollapsed ? 'w-16' : 'w-96'} flex-shrink-0`}>
            <div className="h-full pt-4 pb-4 pl-2">
              <AIPanel 
                collapsed={rightPanelCollapsed}
                onToggle={() => setRightPanelCollapsed(!rightPanelCollapsed)}
              />
            </div>
          </div>
        </div>
      </div>
    </NavigationProvider>
  );
}