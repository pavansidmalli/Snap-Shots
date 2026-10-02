import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Instagram, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { CountrySelector } from './CountrySelector';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWhatsAppPinging, setIsWhatsAppPinging] = useState(false);

  const handleWhatsAppClick = () => {
    setIsWhatsAppPinging(false);
    requestAnimationFrame(() => {
      setIsWhatsAppPinging(true);
      setTimeout(() => setIsWhatsAppPinging(false), 800);
    });
  };

  useEffect(() => {
    let ticking = false;
    let lastState = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          if (scrolled !== lastState) {
            setIsScrolled(scrolled);
            lastState = scrolled;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#work' },
    { label: 'Packages', href: '#pricing' },
    { label: 'How It Works', href: '#process' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-1 sm:py-1.5 bg-black/95 backdrop-blur-xl shadow-2xl shadow-black/60 border-b border-zinc-800/80' : 'py-1.5 sm:py-2 bg-black/85 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4 min-h-[46px] sm:min-h-[58px] md:min-h-[66px]">
          {/* Header Brand Logo Section */}
          <div
            className="inline-flex items-center justify-center group focus:outline-none rounded-md transition-transform duration-200 shrink-0"
            id="header-brand-logo"
          >
            <BrandLogo variant="header" allowUpload={false} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-inner" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <a
              href={`https://wa.me/${siteConfig.business.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.business.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              aria-label="WhatsApp Us"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-[#bd1616] hover:bg-[#bd1616] active:scale-90 transition-all duration-200 cursor-pointer"
              id="header-whatsapp-btn"
            >
              {isWhatsAppPinging && (
                <span className="absolute inset-0 rounded-full bg-[#bd1616] animate-ping opacity-75 pointer-events-none" />
              )}
              <Phone className="w-4 h-4 relative z-10" />
            </a>
            <button
              onClick={onBookClick}
              id="header-book-btn"
              className="group relative flex h-10 items-center justify-center gap-2 rounded-full bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] px-6 text-xs font-bold text-white uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-[#bd1616]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>BOOK A SHOOT</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <button
              onClick={onBookClick}
              className="flex h-9 items-center justify-center rounded-full bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] px-3.5 text-xs font-bold text-white uppercase tracking-wider shadow-sm active:scale-95 transition-transform cursor-pointer"
              id="mobile-quick-book-btn"
            >
              BOOK
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-white hover:text-white hover:bg-zinc-800 shadow-sm active:scale-95 transition-all cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay to close when tapped outside */}
            <div
              className="fixed inset-0 top-0 bg-black/75 backdrop-blur-xs z-30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              className="relative z-40 lg:hidden mt-2 pt-3 pb-5 px-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200"
              id="mobile-nav-dropdown"
            >
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="flex items-center h-11 px-3.5 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors active:bg-zinc-800"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2.5">
                {/* Mobile Drawer Country Switcher */}
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-xs">
                  <span className="text-zinc-300 font-semibold">Region &amp; Currency</span>
                  <CountrySelector id="mobile-drawer-country-selector" />
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-[#bd1616] hover:bg-[#9e1212] active:bg-[#750d0d] text-xs font-bold text-white uppercase tracking-wider shadow-md active:scale-98 cursor-pointer"
                  id="mobile-menu-book-cta"
                >
                  <span>BOOK A SHOOT</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </button>
                <a
                  href={siteConfig.business.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 h-10 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  <Instagram className="w-4 h-4 text-[#bd1616]" />
                  <span>Follow {siteConfig.business.instagramHandle}</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
