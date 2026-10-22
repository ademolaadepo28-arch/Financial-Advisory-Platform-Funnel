'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SipCalculator from './SipCalculator';
import RetirementCalculator from './RetirementCalculator';
import AnnuityCalculator from './AnnuityCalculator';
import GoalSavingsCalculator from './GoalSavingsCalculator';
import NpvCalculator from './NpvCalculator';
import {
  TrendingUp,
  Hourglass,
  Coins,
  Target,
  Activity,
  FileSpreadsheet,
  Download,
  Share2,
  Check,
} from 'lucide-react';

export type CalculatorTab = 'sip' | 'retirement' | 'annuity' | 'goal' | 'npv';

export default function CalculatorSuite({ defaultTab = 'sip' }: { defaultTab?: CalculatorTab }) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as CalculatorTab | null;

  const [activeTab, setActiveTab] = useState<CalculatorTab>(tabParam || defaultTab);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (tabParam && ['sip', 'retirement', 'annuity', 'goal', 'npv'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const tabs: {
    id: CalculatorTab;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    {
      id: 'sip',
      label: 'SIP vs. Lumpsum',
      sublabel: 'Compounding & Averaging',
      icon: TrendingUp,
      badge: 'Most Popular',
    },
    {
      id: 'retirement',
      label: 'Retirement Corpus',
      sublabel: 'Accumulation vs. Decumulation',
      icon: Hourglass,
    },
    {
      id: 'annuity',
      label: 'Annuity & Cashflow',
      sublabel: 'SWP & Capital Decay',
      icon: Coins,
    },
    {
      id: 'goal',
      label: 'Goal Savings',
      sublabel: 'Shortfall & Step-Up SIP',
      icon: Target,
    },
    {
      id: 'npv',
      label: 'NPV & Valuation',
      sublabel: 'DCF, IRR & Payback',
      icon: Activity,
    },
  ];

  const handleShare = () => {
    const url = `${window.location.origin}/calculators?tab=${activeTab}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-8">
      {/* Tab Switcher Header */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        {/* Scrollable Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-left shrink-0 transition-all ${
                  isActive
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-white shadow-lg shadow-emerald-950/40'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-emerald-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                    {tab.label}
                    {tab.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-500/30">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500">{tab.sublabel}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons: Share & Print */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
            title="Copy link to this calculator"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px]">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Share Tool</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
            title="Print or Save as PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Active Calculator Rendering */}
      <div className="transition-all duration-300">
        {activeTab === 'sip' && <SipCalculator />}
        {activeTab === 'retirement' && <RetirementCalculator />}
        {activeTab === 'annuity' && <AnnuityCalculator />}
        {activeTab === 'goal' && <GoalSavingsCalculator />}
        {activeTab === 'npv' && <NpvCalculator />}
      </div>
    </div>
  );
}
