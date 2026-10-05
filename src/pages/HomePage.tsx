import React from 'react';
import { Hero } from '../components/Hero';
import { HeroStatsBar } from '../components/HeroStatsBar';
import { Pricing } from '../components/Pricing';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Process } from '../components/Process';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';
import { FadeInSection } from '../components/FadeInSection';
import { ReelWorkItem, PackageItem } from '../types';

interface HomePageProps {
  onBookClick: (pkgId?: string) => void;
  onSelectReel?: (reel: ReelWorkItem) => void;
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
      {/* 1. Combined Hero & Portfolio Section with Single Continuous Background */}
      <FadeInSection duration={0.8} yOffset={20}>
        <Hero
          onBookClick={() => onBookClick()}
          onViewWorkClick={scrollToWork}
          onWatchReel={onSelectReel}
        />
      </FadeInSection>

      {/* 2. 5000+ Reels Delivered & Core Metrics Bar */}
      <FadeInSection>
        <HeroStatsBar />
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
