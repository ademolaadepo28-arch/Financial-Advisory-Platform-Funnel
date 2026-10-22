'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ActiveDossierSnapshot } from '@/types';

interface BookingContextType {
  isOpen: boolean;
  activeDossier: ActiveDossierSnapshot | null;
  openBooking: (dossier?: ActiveDossierSnapshot) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDossier, setActiveDossier] = useState<ActiveDossierSnapshot | null>(null);

  const openBooking = (dossier?: ActiveDossierSnapshot) => {
    if (dossier) {
      setActiveDossier(dossier);
    } else {
      setActiveDossier({
        calculatorType: 'general',
        calculatorTitle: 'General Wealth Strategy Consultation',
        summaryMetrics: [
          { label: 'Consultation Format', value: '1-on-1 Google Meet (30 Mins)' },
          { label: 'Advisor Mandate', value: 'SEBI Registered RIA (Fee-Only)' },
        ],
        keyInputs: [
          { label: 'Focus Area', value: 'Comprehensive Financial & Tax Optimization' },
        ],
        timestamp: new Date().toISOString(),
      });
    }
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  return (
    <BookingContext.Provider value={{ isOpen, activeDossier, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
