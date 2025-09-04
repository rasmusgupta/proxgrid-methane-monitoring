import MarketingLayout from '@/components/marketing/MarketingLayout';
import Hero from '@/components/marketing/Hero';
import Features from '@/components/marketing/Features';

export default function Home() {
  return (
    <MarketingLayout>
      <Hero />
      <Features />
    </MarketingLayout>
  );
}