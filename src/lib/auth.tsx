'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development
const mockUser: User = {
  id: '1',
  email: 'demo@proxgrid.com',
  name: 'John Smith',
  role: 'admin',
  company: 'ProxGrid Energy Solutions',
  avatar: '/ProxGrid.png'
};

// Mock credentials (in production, this would be handled by Clerk)
const mockCredentials = {
  'demo@proxgrid.com': 'demo123',
  'admin@proxgrid.com': 'admin123',
  'user@proxgrid.com': 'user123'
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage (mock session)
    // Only run on client side to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('proxgrid-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check mock credentials
    if (mockCredentials[email as keyof typeof mockCredentials] === password) {
      const authenticatedUser = { ...mockUser, email };
      setUser(authenticatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('proxgrid-user', JSON.stringify(authenticatedUser));
      }
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('proxgrid-user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}