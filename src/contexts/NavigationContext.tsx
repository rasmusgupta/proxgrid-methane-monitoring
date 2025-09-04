'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type NavigationView = 'dashboard' | 'map' | 'reporting' | 'communications';

interface NavigationContextType {
  activeView: NavigationView;
  setActiveView: (view: NavigationView) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<NavigationView>('dashboard');

  return (
    <NavigationContext.Provider value={{ activeView, setActiveView }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}