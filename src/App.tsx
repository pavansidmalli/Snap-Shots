/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClientLogosSection } from './components/ClientLogosSection';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { PortfolioModal } from './components/PortfolioModal';
import { Pricing } from './components/Pricing';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { BookingForm } from './components/BookingForm';
import { BookingModal } from './components/BookingModal';
import { CTA } from './components/CTA';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { WelcomePopup } from './components/WelcomePopup';
import { LogoProvider } from './context/LogoContext';
import { CountryProvider } from './context/CountryContext';
import { FadeInSection } from './components/FadeInSection';
import { ReelWorkItem } from './types';

export default function App() {
  const [selectedReel, setSelectedReel] = useState<ReelWorkItem | null>(null);
  const [selectedService, setSelectedService] = useState<string>('Event Reels');
  const [selectedPackage, setSelectedPackage] = useState<string>('event-reel');
  const [selectedCoupon, setSelectedCoupon] = useState<string>('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const openBookingModal = (service?: string, pkgId?: string, coupon?: string) => {
    if (service) setSelectedService(service);
    if (pkgId) setSelectedPackage(pkgId);
    if (coupon !== undefined) setSelectedCoupon(coupon);
    setIsBookingModalOpen(true);
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkgId: string) => {
    openBookingModal(undefined, pkgId);
  };

  const handleSelectService = (serviceTitle: string) => {
    openBookingModal(serviceTitle);
  };

  const handleModalBookShoot = (serviceTitle: string) => {
    setSelectedReel(null);
    openBookingModal(serviceTitle);
  };

  // Universal delegate listener to ensure any "BOOK A SHOOT", "BOOK NOW", "BOOK YOUR SHOOT" button opens the popup
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest clickable button or link
      const clickable = target.closest('button, a');
      if (!clickable) return;

      // Ignore buttons inside the modal itself or form submission buttons inside the form
      if (clickable.closest('#booking-modal-form-content') || clickable.closest('#booking-modal-success')) {
        return;
      }
      if (clickable.id === 'booking-submit-btn') {
        // Allow the in-page form to submit its own handler
        return;
      }

      const text = (clickable.textContent || '').trim().toUpperCase();
      const isBookingTrigger =
        text === 'BOOK A SHOOT' ||
        text === 'BOOK NOW' ||
        text === 'BOOK YOUR SHOOT' ||
        text === 'BOOK' ||
        text === 'BOOK THIS SERVICE' ||
        text === 'BOOK SNAP SHOTS ELITE' ||
        text.includes('START STEP 01: BOOK YOUR SESSION');

      if (isBookingTrigger) {
        e.preventDefault();
        openBookingModal();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <CountryProvider>
      <LogoProvider>
        <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#1a0000] via-35% to-[#000000] text-white selection:bg-[#bd1616] selection:text-white relative overflow-x-hidden">
        {/* Background Gradient Mesh with Black & Red */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Top Hero Radial Glow in Red & Black */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(189,22,22,0.18)_0%,rgba(117,13,13,0.08)_45%,transparent_75%)] blur-3xl" />
          
          {/* Mid-Left Black & Red Ambient Glow */}
          <div className="absolute top-[28%] -left-52 w-[850px] h-[850px] bg-[radial-gradient(ellipse_at_center,rgba(189,22,22,0.12)_0%,rgba(117,13,13,0.06)_50%,transparent_75%)] blur-3xl animate-pulse-soft" />
          
          {/* Mid-Right Black & Red Ambient Glow */}
          <div className="absolute top-[58%] -right-52 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,rgba(189,22,22,0.14)_0%,rgba(117,13,13,0.06)_50%,transparent_75%)] blur-3xl" />
          
          {/* Bottom Black & Red Glow */}
          <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(189,22,22,0.14)_0%,rgba(117,13,13,0.08)_45%,transparent_75%)] blur-3xl" />

          {/* Subtle Vignette Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
        </div>

        {/* 1. Sticky Navigation Header */}
        <Header onBookClick={() => openBookingModal()} />

        <main className="relative z-10">
          {/* 2. Hero Section with dynamic 9:16 phone reel, stats, & CTA */}
          <FadeInSection duration={0.8} yOffset={20}>
            <Hero onBookClick={() => openBookingModal()} onViewWorkClick={scrollToWork} />
          </FadeInSection>

          {/* 3. Trusted Brand Logos Marquee Section */}
          <FadeInSection duration={0.6}>
            <ClientLogosSection />
          </FadeInSection>

          {/* 4. Services Section - 9 categories tailored to Snap Shots */}
          <FadeInSection>
            <Services onBookService={handleSelectService} />
          </FadeInSection>

          {/* 4. Portfolio / Work That Performs - 9:16 vertical videos with autoplay & full reel modal */}
          <FadeInSection>
            <Portfolio onSelectReel={(reel) => setSelectedReel(reel)} />
          </FadeInSection>

          {/* 5. Pricing - Quick Shot (₹1,299), Event Reel (₹2,999), Full Content (₹4,999), and Snap Shots Elite */}
          <FadeInSection>
            <Pricing onSelectPackage={handleSelectPackage} />
          </FadeInSection>

          {/* 6. Why Choose Us - The Snap Shots Difference (Trained creators, ₹1,299 pricing, Same-Day delivery, 4K backup) */}
          <FadeInSection>
            <WhyChooseUs />
          </FadeInSection>

          {/* 7. Process - How Snap Shots Works (01 Request -> 02 Book -> 03 Shoot -> 04 Deliver) */}
          <FadeInSection>
            <Process onStartBooking={() => openBookingModal()} />
          </FadeInSection>

          {/* 8. Testimonials - Real client reviews from weddings, events, summits, & brands */}
          <FadeInSection>
            <Testimonials />
          </FadeInSection>

          {/* 9. FAQ - Frequently asked questions accordion */}
          <FadeInSection>
            <FAQ />
          </FadeInSection>

          {/* 10. Booking Form - Comprehensive appointment scheduler & WhatsApp sync */}
          <FadeInSection>
            <BookingForm selectedService={selectedService} selectedPackage={selectedPackage} />
          </FadeInSection>

          {/* 11. Final Call To Action - High conversion banner */}
          <FadeInSection>
            <CTA onBookClick={() => openBookingModal()} />
          </FadeInSection>
        </main>

        {/* 12. Footer */}
        <FadeInSection yOffset={16}>
          <Footer />
        </FadeInSection>

        {/* Floating WhatsApp Quick Action */}
        <FloatingWhatsApp />

        {/* Fullscreen Reel Modal */}
        <PortfolioModal
          reel={selectedReel}
          onClose={() => setSelectedReel(null)}
          onBookShoot={handleModalBookShoot}
        />

        {/* Professional Centered Booking Popup / Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedCoupon('');
          }}
          initialService={selectedService}
          initialPackage={selectedPackage}
          initialCoupon={selectedCoupon}
        />

        {/* Timed Welcome Privilege Offer Popup after Website Load */}
        <WelcomePopup onClaimOffer={() => openBookingModal(undefined, undefined, 'SNAP15')} />
      </div>
      </LogoProvider>
    </CountryProvider>
  );
}
