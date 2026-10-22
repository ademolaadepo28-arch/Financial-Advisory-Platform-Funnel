'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Phone, MapPin, ExternalLink, Award, ArrowUpRight } from 'lucide-react';
import { useBooking } from '@/components/booking/BookingContext';

export default function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm pb-16 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand & Credentials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-lg">
                A
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Artha<span className="text-emerald-400">Vault</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Fee-Only SEBI Registered Investment Advisory (RIA) portal. Un-gated mathematical tools,
              transparent evidence-based wealth planning, and conflict-free private consultation.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>SEBI Registration: INA000018921 (Valid & Active)</span>
              </div>
              <div className="text-slate-400 text-[11px]">
                BASL Membership ID: BASL-1402 | Entity Type: Individual RIA
              </div>
            </div>
          </div>

          {/* Calculator Suite */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Mathematical Suite
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/calculators?tab=sip" className="hover:text-emerald-400 transition-colors">
                  SIP vs. Lumpsum Engine
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=retirement" className="hover:text-emerald-400 transition-colors">
                  Retirement Corpus & Decumulation
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=annuity" className="hover:text-emerald-400 transition-colors">
                  Annuity & Cashflow Tracker
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=goal" className="hover:text-emerald-400 transition-colors">
                  Goal Savings & Shortfall
                </Link>
              </li>
              <li>
                <Link href="/calculators?tab=npv" className="hover:text-emerald-400 transition-colors">
                  NPV & Valuation Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Regulatory & Redressal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              SEBI Compliance
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/disclosures" className="hover:text-emerald-400 transition-colors">
                  Statutory Disclosures
                </Link>
              </li>
              <li>
                <Link href="/disclosures#redressal" className="hover:text-emerald-400 transition-colors">
                  Grievance Redressal Matrix
                </Link>
              </li>
              <li>
                <Link href="/disclosures#risk-profiler" className="hover:text-emerald-400 transition-colors">
                  Interactive Risk Profiler
                </Link>
              </li>
              <li>
                <a
                  href="https://scores.sebi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  SEBI SCORES Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://smartodr.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
                >
                  SMART ODR Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Consultation Booking */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Private Booking
            </h4>
            <p className="text-xs text-slate-400">
              Direct peer-to-merchant UPI settlement. Zero commissions, zero distributor cut.
            </p>
            <button
              onClick={() => openBooking()}
              className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              Reserve 30-Min Slot (₹2,499)
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>Express Towers, Nariman Point, Mumbai 400021</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                <span>advisory@arthavault.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclosure Block */}
        <div className="pt-8 text-[11px] text-slate-500 leading-relaxed space-y-3">
          <p>
            <strong className="text-slate-400">SEBI Disclaimer:</strong> Investment in securities
            market are subject to market risks. Read all the related documents carefully before
            investing. Registration granted by SEBI, membership of BASL and certification from NISM in
            no way guarantee performance of the intermediary or provide any assurance of returns to
            investors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900 text-slate-500">
            <p>© {new Date().getFullYear()} ArthaVault Advisory LLP. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/disclosures" className="hover:text-slate-400">
                Privacy Policy
              </Link>
              <Link href="/disclosures" className="hover:text-slate-400">
                Terms of Advisory
              </Link>
              <Link href="/faq" className="hover:text-slate-400">
                Investor Charter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
