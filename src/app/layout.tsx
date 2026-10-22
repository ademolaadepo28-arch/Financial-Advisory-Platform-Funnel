import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PersistentDisclaimerBanner from '@/components/layout/PersistentDisclaimerBanner';
import BookingModal from '@/components/booking/BookingModal';
import { BookingProvider } from '@/components/booking/BookingContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ArthaVault | SEBI Registered Investment Advisory (RIA) & Financial Calculators',
  description:
    'Institutional-grade financial calculators, mathematical wealth authority, and conflict-free private consultation booking for discerning Indian investors. SEBI Reg: INA000018921.',
  keywords: [
    'SEBI RIA',
    'Fee Only Financial Planner',
    'SIP Calculator India',
    'Retirement Corpus Calculator',
    'Annuity SWP Calculator',
    'NPV Valuation Tool',
    'Indian Wealth Advisory',
  ],
  authors: [{ name: 'Aarav Sharma, CFA, SEBI RIA' }],
  openGraph: {
    title: 'ArthaVault | Institutional Financial Advisory & Calculator Suite',
    description:
      'Un-gated mathematical calculators (SIP, Retirement, Annuity, Goal, NPV) and direct bank-integrated private consultation.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#080c14] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
        <BookingProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <PersistentDisclaimerBanner />
          <BookingModal />
        </BookingProvider>
      </body>
    </html>
  );
}
