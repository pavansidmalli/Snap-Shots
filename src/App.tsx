/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { FaqsPage } from './pages/FaqsPage';
import { ContactPage } from './pages/ContactPage';
import { BookingModal } from './components/BookingModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { WelcomePopup } from './components/WelcomePopup';
import { LogoProvider } from './context/LogoContext';
import { CountryProvider } from './context/CountryContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { AdminLoginModal } from './components/AdminLoginModal';
import { PackageItem } from './types';
import { CinematicRedStageBackground } from './components/CinematicRedStageBackground';

// Scroll restoration helper on route transition
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function MainAppLayout() {
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

  const handleSelectPackage = (pkgId: string) => {
    openBookingModal(undefined, pkgId);
  };

  const handleSelectService = (serviceTitle: string) => {
    openBookingModal(serviceTitle);
  };

  // Universal delegate listener to ensure any "BOOK A SHOOT" button triggers the modal
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest('button, a');
      if (!clickable) return;

      if (clickable.closest('#booking-modal-form-content') || clickable.closest('#booking-modal-success')) {
        return;
      }
      if (clickable.id === 'booking-submit-btn') {
        return;
      }

      // Avoid intercepting external links, whatsapp, phone, email
      const href = clickable.getAttribute('href');
      if (
        href &&
        (href.startsWith('http') ||
          href.startsWith('tel:') ||
          href.startsWith('mailto:') ||
          href.includes('wa.me') ||
          href.includes('whatsapp.com') ||
          href.includes('api.whatsapp.com'))
      ) {
        return;
      }

      const text = (clickable.textContent || '').trim().toUpperCase();
      const isBookingTrigger =
        text.includes('BOOK A SHOOT') ||
        text.includes('BOOK NOW') ||
        text.includes('BOOK YOUR SHOOT') ||
        text.includes('BOOK THIS SERVICE') ||
        text.includes('BOOK SNAP SHOTS ELITE') ||
        text.includes('START STEP 01') ||
        clickable.id === 'header-book-btn' ||
        clickable.id === 'footer-book-cta-btn' ||
        clickable.id === 'menu-book-now-btn' ||
        clickable.id === 'wedding-plan-book-btn';

      if (isBookingTrigger) {
        openBookingModal();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-[#bd1616] selection:text-white relative overflow-x-hidden">
      {/* Cinematic Red Stage Background Theme (User Uploaded Reference) */}
      <CinematicRedStageBackground />

      <ScrollToTop />

      {/* Sticky Navigation Header with Multi-Page Routing */}
      <Header onBookClick={() => openBookingModal()} />

      {/* Main Routed Content */}
      <main className="relative z-10">
        <Routes>
          {/* Home Page: Clean Landing Page (Services & FAQs removed as requested) */}
          <Route
            path="/"
            element={
              <HomePage
                onBookClick={(pkgId) => openBookingModal(undefined, pkgId)}
                onSelectPackage={handleSelectPackage}
              />
            }
          />

          {/* Separate Dedicated Services Page */}
          <Route
            path="/services"
            element={<ServicesPage onBookService={handleSelectService} />}
          />

          {/* Separate Dedicated FAQs Page */}
          <Route
            path="/faqs"
            element={<FaqsPage onOpenBooking={() => openBookingModal()} />}
          />

          {/* Separate Dedicated Contact Us Page */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive In-Site WhatsApp Widget (Bottom-Right) */}
      <FloatingWhatsApp onOpenBooking={() => openBookingModal()} />

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

      {/* Timed Welcome Privilege Offer Popup */}
      <WelcomePopup onClaimOffer={() => openBookingModal(undefined, undefined, 'SNAP15')} />

      {/* Admin Login Modal */}
      <AdminLoginModal />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <CountryProvider>
        <LogoProvider>
          <BrowserRouter>
            <MainAppLayout />
          </BrowserRouter>
        </LogoProvider>
      </CountryProvider>
    </AdminAuthProvider>
  );
}
