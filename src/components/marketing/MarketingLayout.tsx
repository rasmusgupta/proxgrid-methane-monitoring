import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}