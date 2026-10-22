'use client';

import React, { useState } from 'react';
import { AlertCircle, X, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PersistentDisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Statutory Regulatory Disclosure"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-amber-500/30 bg-slate-950/95 backdrop-blur-xl px-4 py-2.5 sm:py-3 shadow-2xl transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-start sm:items-center gap-2.5 text-slate-300">
          <span className="p-1 rounded-md bg-amber-500/10 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
            <AlertCircle className="w-4 h-4" />
          </span>
          <p className="leading-tight sm:leading-normal text-slate-300 text-[11px] sm:text-xs">
            <strong className="text-amber-300 font-semibold">Statutory Disclosure:</strong>{' '}
            Investment in securities markets are subject to market risks. Read all scheme-related
            documents carefully. All mathematical models and calculator outputs represent illustrative
            projections rather than guaranteed future returns or binding investment advice.
            <Link
              href="/disclosures"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 underline font-medium ml-1.5"
            >
              SEBI Grievance Redressal & Matrix <ExternalLink className="w-3 h-3 inline" />
            </Link>
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors shrink-0"
          aria-label="Dismiss disclaimer"
          title="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
