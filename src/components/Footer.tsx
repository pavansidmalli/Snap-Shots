import React from 'react';
import { Instagram, Youtube, Facebook, Phone, Mail, MapPin, ArrowUp, MessageSquare } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#work' },
    { label: 'Packages', href: '#pricing' },
    { label: 'How It Works', href: '#process' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <footer className="bg-black/80 backdrop-blur-md text-white pt-16 pb-24 sm:pb-12 border-t border-zinc-900/80 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-zinc-900">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start gap-2">
              <div
                className="inline-block mb-0.5"
                id="footer-brand-logo"
              >
                <BrandLogo variant="footer" allowUpload={true} />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] lowercase text-zinc-400">
                your moments our snaps
              </span>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Professional reels, photography and visual content created for events, brands, businesses and social media. Same-day delivery with cinema-grade polish.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 hover:text-white hover:bg-[#bd1616] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.business.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 hover:text-white hover:bg-[#bd1616] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.business.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 hover:text-white hover:bg-[#bd1616] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="hover:text-[#bd1616] transition-colors hover:translate-x-1 inline-block"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#services" className="hover:text-[#bd1616] transition-colors">
                  Wedding Reels
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#bd1616] transition-colors">
                  Event Highlights
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#bd1616] transition-colors">
                  Corporate Launches
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#bd1616] transition-colors">
                  Product Commercials
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#bd1616] transition-colors">
                  Creator Batches
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
              Contact &amp; Hubs
            </h4>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#bd1616] flex-shrink-0" />
                <a href={`tel:${siteConfig.business.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                  {siteConfig.business.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#bd1616] flex-shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.business.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteConfig.business.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {siteConfig.business.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#bd1616] flex-shrink-0" />
                <a href={`mailto:${siteConfig.business.email}`} className="hover:text-white transition-colors">
                  {siteConfig.business.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#bd1616] flex-shrink-0 mt-0.5" />
                <span>Telangana, India &amp; USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 pb-12 sm:pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.business.name}. All rights reserved. Built for social-first creators &amp; events.
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
            <a href="#home" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </a>
            <span>&bull;</span>
            <a href="#home" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </a>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#bd1616] hover:bg-[#9e1212] text-white text-xs font-black transition-colors cursor-pointer shadow-md"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
