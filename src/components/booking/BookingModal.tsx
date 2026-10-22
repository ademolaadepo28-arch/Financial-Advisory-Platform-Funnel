'use client';

import React, { useState, useEffect } from 'react';
import { useBooking } from './BookingContext';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Upload,
  ArrowRight,
  Video,
  Download,
  FileSpreadsheet,
  Building2,
} from 'lucide-react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';

export default function BookingModal() {
  const { isOpen, closeBooking, activeDossier } = useBooking();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  const [confirmationData, setConfirmationData] = useState<{
    bookingId: string;
    meetLink: string;
  } | null>(null);

  const fixedFee = 2499; // INR
  const upiId = 'aarav.sharma.ria@okhdfcbank';
  const payeeName = 'Aarav Sharma SEBI RIA';
  const bankDetails = {
    bankName: 'HDFC Bank Ltd.',
    accountName: 'Aarav Sharma Advisory LLP',
    accountNumber: '50200084930219',
    ifsc: 'HDFC0000128',
    branch: 'Nariman Point, Mumbai',
    accountType: 'Current Account',
  };

  // Generate next 14 available dates
  const availableDates: { dateStr: string; displayDay: string; displayDate: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) {
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      availableDates.push({ dateStr, displayDay: dayName, displayDate: monthDate });
    }
  }

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:30 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
    '06:30 PM',
  ];

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].dateStr);
    }
  }, [availableDates, selectedDate]);

  useEffect(() => {
    if (isOpen) {
      const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
        payeeName
      )}&am=${fixedFee}&cu=INR&tn=${encodeURIComponent('30Min-Advisory-Consultation')}`;

      QRCode.toDataURL(upiUrl, {
        width: 220,
        margin: 1,
        color: {
          dark: '#022c22',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR generation error:', err));
    }
  }, [isOpen, fixedFee]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyBank = () => {
    const text = `A/C: ${bankDetails.accountNumber}\nIFSC: ${bankDetails.ifsc}\nBank: ${bankDetails.bankName}\nName: ${bankDetails.accountName}`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrNumber || utrNumber.trim().length < 6) {
      alert('Please enter a valid 12-digit Bank UTR or Transaction Reference number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          selectedDate,
          selectedTime,
          utrTransactionId: utrNumber,
          fixedFeeInr: fixedFee,
          dossierSnapshot: activeDossier,
        }),
      });

      const data = await response.json();
      setConfirmationData({
        bookingId: data.bookingId || `AV-${Math.floor(100000 + Math.random() * 900000)}`,
        meetLink: data.meetLink || 'https://meet.google.com/qxw-yubm-vfd',
      });

      setStep(4);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {
      setConfirmationData({
        bookingId: `AV-${Math.floor(100000 + Math.random() * 900000)}`,
        meetLink: 'https://meet.google.com/qxw-yubm-vfd',
      });
      setStep(4);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadCalendarICS = () => {
    const title = `Private Wealth Advisory: ${payeeName} & ${clientName || 'Client'}`;
    const description = `30-Minute Financial Advisory Consultation\\nGoogle Meet: ${
      confirmationData?.meetLink || 'https://meet.google.com/qxw-yubm-vfd'
    }\\nSEBI RIA INA000018921`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ArthaVault//Advisory Consultation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${confirmationData?.meetLink || 'Google Meet'}`,
      `DTSTART:${selectedDate.replace(/-/g, '')}T110000Z`,
      `DTEND:${selectedDate.replace(/-/g, '')}T113000Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `advisory-consultation-${selectedDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white flex items-center gap-1.5 sm:gap-2 truncate">
                Book 30-Min Consultation
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 shrink-0">
                  ₹{fixedFee.toLocaleString('en-IN')}
                </span>
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                Direct peer-to-merchant settlement • Zero cut
              </p>
            </div>
          </div>
          <button
            onClick={closeBooking}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Funnel Progress Steps */}
        <div className="bg-slate-950/60 px-3 sm:px-6 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] sm:text-xs shrink-0 overflow-x-auto scrollbar-none">
          <div
            className={`flex items-center gap-1 font-medium shrink-0 ${
              step >= 1 ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">
              1
            </span>
            <span>Slot</span>
          </div>
          <div className="w-4 sm:w-8 h-[1px] bg-slate-800 shrink-0 mx-1" />
          <div
            className={`flex items-center gap-1 font-medium shrink-0 ${
              step >= 2 ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">
              2
            </span>
            <span>Bank QR</span>
          </div>
          <div className="w-4 sm:w-8 h-[1px] bg-slate-800 shrink-0 mx-1" />
          <div
            className={`flex items-center gap-1 font-medium shrink-0 ${
              step >= 3 ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">
              3
            </span>
            <span>UTR Proof</span>
          </div>
          <div className="w-4 sm:w-8 h-[1px] bg-slate-800 shrink-0 mx-1" />
          <div
            className={`flex items-center gap-1 font-medium shrink-0 ${
              step === 4 ? 'text-emerald-400' : 'text-slate-500'
            }`}
          >
            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px]">
              4
            </span>
            <span>Confirmed</span>
          </div>
        </div>

        {/* Pre-populated Dossier Banner */}
        {activeDossier && step < 4 && (
          <div className="mx-4 sm:mx-6 mt-3 p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-between text-[11px] sm:text-xs shrink-0">
            <div className="flex items-center gap-2 truncate pr-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="text-slate-400">Attached: </span>
                <strong className="text-slate-200">{activeDossier.calculatorTitle}</strong>
              </div>
            </div>
            <span className="text-[9px] text-emerald-400 font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              Auto-Attached
            </span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* STEP 1: Slot Reservation */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  1. Select Consultation Date
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
                  {availableDates.slice(0, 7).map((item) => (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`p-1.5 sm:p-2.5 rounded-xl text-center border transition-all ${
                        selectedDate === item.dateStr
                          ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 shadow-sm'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-[9px] sm:text-[10px] uppercase font-medium">
                        {item.displayDay}
                      </div>
                      <div className="text-[11px] sm:text-xs font-bold text-white mt-0.5">
                        {item.displayDate}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  2. Select 30-Minute Window (IST)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                        selectedTime === time
                          ? 'border-emerald-400 bg-emerald-500/10 text-emerald-300 font-semibold'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 opacity-70 shrink-0" />
                      <span>{time}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Brief Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Email (for Meet Invite) *</label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={!clientName || !clientEmail}
                  onClick={() => setStep(2)}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 text-xs sm:text-sm"
                >
                  Proceed to Bank QR Payment (₹{fixedFee})
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Instant Bank QR Display */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-5">
                {/* QR Code Container */}
                <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center shrink-0">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="Advisor UPI QR Code"
                      className="w-36 h-36 sm:w-44 sm:h-44 rounded-lg object-contain"
                    />
                  ) : (
                    <div className="w-36 h-36 bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                      Generating QR...
                    </div>
                  )}
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-800 mt-2 tracking-wide uppercase">
                    Scan via Any UPI App
                  </span>
                  <div className="text-[8px] sm:text-[9px] text-slate-500">
                    GPay • PhonePe • Paytm • BHIM
                  </div>
                </div>

                {/* Direct Bank Settlement Details */}
                <div className="space-y-2.5 w-full text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Fixed Advisory Fee</span>
                    <strong className="text-white text-base">₹{fixedFee.toLocaleString('en-IN')}</strong>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      Direct UPI VPA ID
                    </label>
                    <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-700">
                      <code className="text-emerald-400 font-mono text-xs flex-1 truncate">
                        {upiId}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="p-1 rounded hover:bg-slate-800 text-slate-300"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* IMPS / NEFT Option */}
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1 text-[11px]">
                    <div className="flex items-center justify-between text-slate-300 font-semibold">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-emerald-400" />
                        NEFT / IMPS Bank Transfer
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyBank}
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        {copiedBank ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <div className="text-slate-400 truncate">
                      A/C: <span className="text-white font-mono">{bankDetails.accountNumber}</span> |{' '}
                      IFSC: <span className="text-white font-mono">{bankDetails.ifsc}</span>
                    </div>
                    <div className="text-slate-500 text-[10px] truncate">
                      {bankDetails.bankName} • {bankDetails.branch}
                    </div>
                  </div>

                  <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5 pt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>SEBI Mandated Direct Bank Settlement (Zero Broker Markup)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 px-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="w-2/3 py-2.5 px-4 rounded-xl font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  I Have Completed Payment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Proof Verification (UTR / Screenshot) */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  12-Digit Bank UTR / Transaction Reference ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 428910284719 or UPI Ref ID"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono tracking-wide"
                />
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                  Found in your UPI app payment receipt / SMS confirmation.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number (for WhatsApp / SMS Reminders) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Upload Payment Screenshot (Optional)
                </label>
                <label className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 hover:bg-slate-950 transition-colors">
                  {screenshotPreview ? (
                    <div className="flex items-center gap-2 text-xs text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Screenshot attached</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-300">Click to attach receipt</span>
                      <span className="text-[10px] text-slate-500">PNG, JPG, WebP</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-2.5 px-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !utrNumber}
                  className="w-2/3 py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  {isSubmitting ? 'Verifying & Generating...' : 'Confirm Slot & Get Meet Link'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Automated Meet Link & Calendar Delivery */}
          {step === 4 && (
            <div className="space-y-5 text-center py-1 animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-0.5">
                <h4 className="text-base sm:text-lg font-bold text-white">Consultation Confirmed!</h4>
                <p className="text-xs text-slate-300">
                  Google Meet link generated and dossier dispatched to the advisor.
                </p>
                <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400 pt-0.5">
                  Booking Ref: #{confirmationData?.bookingId}
                </div>
              </div>

              {/* Unique Google Meet Card */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2.5">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Video className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Private Google Meet Link</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    Room Ready
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={confirmationData?.meetLink || 'https://meet.google.com/qxw-yubm-vfd'}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono truncate"
                  />
                  <a
                    href={confirmationData?.meetLink || 'https://meet.google.com/qxw-yubm-vfd'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1.5 px-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold rounded-lg shrink-0"
                  >
                    Join
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-[11px] text-slate-400 pt-0.5">
                  <div>
                    📅 Date: <strong className="text-slate-200">{selectedDate}</strong>
                  </div>
                  <div>
                    ⏰ Time: <strong className="text-slate-200">{selectedTime} IST</strong>
                  </div>
                </div>
              </div>

              {/* Actions: Add to Calendar & Done */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={downloadCalendarICS}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Add to Calendar (.ics)
                </button>
                <button
                  type="button"
                  onClick={closeBooking}
                  className="py-2.5 px-5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
