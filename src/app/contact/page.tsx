'use client';

import React, { useState } from 'react';
import { useBooking } from '@/components/booking/BookingContext';
import {
  UserCheck,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Send,
  Award,
  CheckCircle2,
  Building,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';

export default function ContactPage() {
  const { openBooking } = useBooking();

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12 sm:space-y-16 overflow-hidden">
      {/* Title Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <UserCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Fiduciary Principal Officer</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Advisory Profile & Direct Contact
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
          Direct engagement with a fee-only fiduciary registered with SEBI. Conflict-free guidance,
          empirical asset allocation, and bespoke family wealth governance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        {/* Left Column: Advisor Bio & Credentials */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Bio Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-slate-950 font-extrabold text-3xl shadow-xl shadow-emerald-950/60 shrink-0">
                AS
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Aarav Sharma</h2>
                <div className="text-xs sm:text-sm text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                  SEBI Registered Investment Adviser (RIA) • CFA Charterholder
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  14+ Years in Asset Allocation, Family Offices & Quantitative Wealth Architecture
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Aarav Sharma founded ArthaVault to strip away the opaque distribution incentives and
              commission structures that permeate conventional Indian wealth management. Having
              advised over ₹420 Crores across founders, business families, and NRI professionals, his
              practice operates exclusively under a fee-only fiduciary model.
            </p>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span>CFA Institute (USA)</span>
                </div>
                <div className="text-slate-400 text-[11px]">Chartered Financial Analyst (CFA)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>SEBI NISM X-A & X-B</span>
                </div>
                <div className="text-slate-400 text-[11px]">Certified Investment Adviser Level 1 & 2</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SEBI Reg: INA000018921</span>
                </div>
                <div className="text-slate-400 text-[11px]">BASL Membership: BASL-1402</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <Building className="w-4 h-4 text-emerald-400" />
                  <span>Corporate Office</span>
                </div>
                <div className="text-slate-400 text-[11px]">Nariman Point, Mumbai 400021</div>
              </div>
            </div>

            {/* Direct Booking CTA */}
            <div className="pt-2">
              <button
                onClick={() => openBooking()}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Reserve 30-Min Private Consultation (₹2,499)
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Office Location & Written Inquiry Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Office Contact Info */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Registered Office & Coordinates</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Physical Address</strong>
                  <span className="text-slate-400">
                    14th Floor, Express Towers, Barrister Rajni Patel Marg, Nariman Point, Mumbai
                    400021, Maharashtra
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Official Communications</strong>
                  <span className="text-emerald-400 font-mono">advisory@arthavault.in</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Advisory Line</strong>
                  <span className="text-slate-400 font-mono">+91 22 6902 4400 (Mon–Fri 10AM–6PM IST)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Send Non-Booking Inquiry</h3>
            <p className="text-xs text-slate-400">
              For speaking engagements, media inquiries, or institutional compliance verification.
            </p>

            {sentSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Message received. Our compliance desk will respond within 24 business hours.</span>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Radhika Sen"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="radhika@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Inquiry / Query *</label>
                  <textarea
                    required
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Detail your inquiry..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
