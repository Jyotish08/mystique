import Hero from '@/components/sections/Hero';
import FeatureShowcase from '@/components/sections/FeatureShowcase';
import PricingMatrix from '@/components/sections/PricingMatrix';
import SocialProof from '@/components/sections/SocialProof';

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureShowcase />
      <PricingMatrix />
      <SocialProof />
    </>
  );
}
