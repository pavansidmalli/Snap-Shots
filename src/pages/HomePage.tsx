import React from 'react';
import { Hero } from '../components/Hero';
import { ClientLogosSection } from '../components/ClientLogosSection';
import { Portfolio } from '../components/Portfolio';
import { Pricing } from '../components/Pricing';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Process } from '../components/Process';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';
import { FadeInSection } from '../components/FadeInSection';
import { ReelWorkItem, PackageItem } from '../types';

interface HomePageProps {
  onBookClick: (pkgId?: string) => void;
  onSelectReel: (reel: ReelWorkItem) => void;
  onSelectPackage: (pkgId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onBookClick,
  onSelectReel,
  onSelectPackage,
}) => {
  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* 1. Hero Section with dynamic 9:16 phone reel & metrics */}
      <FadeInSection duration={0.8} yOffset={20}>
        <Hero
          onBookClick={() => onBookClick()}
          onViewWorkClick={scrollToWork}
          onWatchReel={onSelectReel}
        />
      </FadeInSection>

      {/* 2. Trusted Brand Logos Marquee */}
      <FadeInSection duration={0.6}>
        <ClientLogosSection />
      </FadeInSection>

      {/* 3. Portfolio / Work That Performs - Auto-scrolling image slides carousel */}
      <FadeInSection>
        <Portfolio onSelectReel={onSelectReel} />
      </FadeInSection>

      {/* 4. Pricing Packages (Hourly, Half Day, Full Day, Custom) */}
      <FadeInSection>
        <Pricing onSelectPackage={onSelectPackage} />
      </FadeInSection>

      {/* 5. Why Choose Us - The Snap Shots Difference */}
      <FadeInSection>
        <WhyChooseUs />
      </FadeInSection>

      {/* 6. Process - How Snap Shots Works */}
      <FadeInSection>
        <Process onStartBooking={() => onBookClick()} />
      </FadeInSection>

      {/* 7. Testimonials & Client Reviews */}
      <FadeInSection>
        <Testimonials />
      </FadeInSection>

      {/* 8. Final CTA Banner */}
      <FadeInSection>
        <CTA onBookClick={() => onBookClick()} />
      </FadeInSection>
    </div>
  );
};
