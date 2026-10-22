'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBooking } from '@/components/booking/BookingContext';
import {
  Calculator,
  ShieldCheck,
  Calendar,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Calculators', href: '/calculators', badge: '5 Tools' },
    { name: 'Investor Hub', href: '/faq' },
    { name: 'SEBI Disclosures', href: '/disclosures' },
    { name: 'About & Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Regulatory Badge */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-950/60 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-bold tracking-tight text-white flex items-center gap-1 sm:gap-1.5">
                Artha<span className="text-emerald-400">Vault</span>
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase px-1.5 py-0.2 sm:py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  RIA
                </span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400 inline shrink-0" />
                <span className="hidden xs:inline">SEBI Reg:</span> INA000018921
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800/80 text-emerald-400 border border-emerald-500/20 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-semibold px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              id="nav-book-consultation-btn"
              onClick={() => openBooking()}
              className="relative inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-200 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-4 h-4 mr-2 text-slate-900" />
              Book 30-Min Consultation
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openBooking()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm active:scale-95 transition-transform"
            >
              Book Slot
            </button>
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBooking();
              }}
              className="w-full py-3 px-4 rounded-xl text-center font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95 transition-transform"
            >
              <Calendar className="w-4 h-4 text-slate-900" />
              Book 30-Min Consultation (₹2,499)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
