'use client';

import { useAuth, AuthProvider } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import AppContent from '@/components/AppContent';

function AuthenticatedApp() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="card-glass p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="text-white mt-4 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <AppLayout>
      <AppContent />
    </AppLayout>
  );
}

export default function AppPage() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}