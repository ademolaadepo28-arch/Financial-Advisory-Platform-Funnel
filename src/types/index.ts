// Types for Financial Advisory Platform & Funnel

export type PayoutFrequency = 'monthly' | 'quarterly' | 'annual';
export type RiskAppetite = 'conservative' | 'moderate' | 'aggressive';

// 1. SIP vs Lumpsum
export interface SIPCalculatorInputs {
  monthlyInstallment: number; // in INR
  tenureYears: number;
  expectedReturnRate: number; // percentage p.a.
  lumpsumSeedFund: number; // in INR
}

export interface SIPYearlyPoint {
  year: number;
  sipInvested: number;
  sipReturns: number;
  sipTotal: number;
  lumpsumInvested: number;
  lumpsumReturns: number;
  lumpsumTotal: number;
  combinedTotal: number;
}

export interface SIPResult {
  totalSipInvested: number;
  totalSipReturns: number;
  finalSipValue: number;
  totalLumpsumInvested: number;
  totalLumpsumReturns: number;
  finalLumpsumValue: number;
  combinedInvested: number;
  combinedFinalValue: number;
  combinedWealthGain: number;
  yearlyData: SIPYearlyPoint[];
}

// 2. Retirement Corpus
export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  lifeExpectancyAge: number;
  monthlyExpense: number; // present day monthly expense
  expectedInflation: number; // percentage p.a.
  postRetirementReturn: number; // percentage p.a.
  preRetirementReturn: number; // percentage p.a. for accumulation
  existingRetirementSavings: number;
}

export interface RetirementYearlyPoint {
  age: number;
  phase: 'accumulation' | 'distribution';
  corpusValue: number;
  annualExpense: number;
  annualContribution?: number;
}

export interface RetirementResult {
  yearsToRetire: number;
  retirementYears: number;
  monthlyExpenseAtRetirement: number;
  annualExpenseAtRetirement: number;
  realRateOfReturn: number;
  requiredCorpus: number;
  futureValueOfExistingSavings: number;
  netCorpusShortfall: number;
  requiredMonthlySip: number;
  exhaustionAge: number; // age at which corpus depletes (or >= lifeExpectancy)
  yearlyData: RetirementYearlyPoint[];
}

// 3. Annuity & Cashflow
export interface AnnuityInputs {
  initialCapitalCorpus: number;
  payoutFrequency: PayoutFrequency;
  assumedAnnualYield: number; // percentage p.a.
  payoutDurationYears: number;
  targetEndingCorpus: number; // 0 for full decumulation
}

export interface AnnuityPeriodPoint {
  periodLabel: string;
  year: number;
  payoutAmount: number;
  interestEarned: number;
  principalDecay: number;
  endingBalance: number;
}

export interface AnnuityResult {
  periodicPayout: number;
  annualizedPayout: number;
  totalPayoutOverDuration: number;
  totalInterestEarned: number;
  effectiveYield: number;
  capitalDecaySchedule: AnnuityPeriodPoint[];
}

// 4. Goal Savings
export interface GoalSavingsInputs {
  targetAmount: number;
  targetDateYears: number;
  existingSavings: number;
  riskAppetite: RiskAppetite; // conservative, moderate, aggressive
  expectedInflation: number;
}

export interface GoalYearlyPoint {
  year: number;
  corpusWithExistingOnly: number;
  corpusWithRequiredSip: number;
  targetLine: number;
}

export interface GoalSavingsResult {
  inflationAdjustedTarget: number;
  assumedReturnRate: number;
  futureValueOfExisting: number;
  netShortfall: number;
  requiredMonthlySip: number;
  requiredStepUpPercentage: number; // 5% or 10% annual step up alternative
  stepUpInitialMonthlySip: number;
  yearlyData: GoalYearlyPoint[];
}

// 5. NPV / Valuation
export interface NPVPeriodInput {
  period: number;
  cashflow: number;
}

export interface NPVInputs {
  discountRatePercentage: number;
  initialCashOutflow: number;
  cashflows: NPVPeriodInput[];
}

export interface NPVPeriodPoint {
  period: number;
  nominalCashflow: number;
  discountFactor: number;
  discountedCashflow: number;
  cumulativeUndiscounted: number;
  cumulativeDiscounted: number;
}

export interface NPVResult {
  npv: number;
  irr: number | null; // percentage
  undiscountedPaybackPeriod: number | null; // in periods/years
  discountedPaybackPeriod: number | null;
  totalNominalInflows: number;
  totalDiscountedInflows: number;
  profitabilityIndex: number;
  isViable: boolean;
  periodsData: NPVPeriodPoint[];
}

// Consultation & Booking Types
export interface ActiveDossierSnapshot {
  calculatorType: 'sip' | 'retirement' | 'annuity' | 'goal' | 'npv' | 'general';
  calculatorTitle: string;
  summaryMetrics: { label: string; value: string; highlight?: boolean }[];
  keyInputs: { label: string; value: string }[];
  timestamp: string;
}

export interface BookingSlot {
  date: string; // YYYY-MM-DD
  time: string; // "10:00 AM"
  available: boolean;
}

export interface ConsultationBookingRequest {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  selectedDate: string;
  selectedTime: string;
  utrTransactionId: string;
  screenshotFileName?: string;
  screenshotBase64?: string;
  fixedFeeInr: number;
  dossierSnapshot?: ActiveDossierSnapshot;
}

export interface ConsultationBookingConfirmation {
  bookingId: string;
  meetLink: string;
  clientName: string;
  clientEmail: string;
  selectedDate: string;
  selectedTime: string;
  utrTransactionId: string;
  status: 'CONFIRMED' | 'PENDING_VERIFICATION';
  createdAt: string;
}

// SEBI Compliance & Risk Questionnaire
export interface RiskQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    score: number; // 1 to 3
    description?: string;
  }[];
}

export interface RiskProfileResult {
  totalScore: number;
  category: 'Conservative' | 'Moderate' | 'Aggressive';
  recommendedAllocation: {
    equity: number;
    debt: number;
    gold: number;
    cash: number;
  };
  narrative: string;
}
