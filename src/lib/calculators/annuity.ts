import { AnnuityInputs, AnnuityResult, AnnuityPeriodPoint } from '@/types';

/**
 * Calculates Annuity & Systematic Withdrawal cashflow schedule and capital decay tracker
 */
export function calculateAnnuityCashflow(inputs: AnnuityInputs): AnnuityResult {
  const {
    initialCapitalCorpus,
    payoutFrequency,
    assumedAnnualYield,
    payoutDurationYears,
    targetEndingCorpus = 0,
  } = inputs;

  const periodsPerYear = payoutFrequency === 'monthly' ? 12 : payoutFrequency === 'quarterly' ? 4 : 1;
  const totalPeriods = Math.max(1, Math.round(payoutDurationYears * periodsPerYear));
  const periodicRate = assumedAnnualYield / 100 / periodsPerYear;

  // Formula for periodic payment from present value PV to future value FV:
  // PMT = [PV * i - FV * i / ( (1+i)^n - 1 )] ... standard financial math
  let periodicPayout = 0;
  if (periodicRate === 0) {
    periodicPayout = (initialCapitalCorpus - targetEndingCorpus) / totalPeriods;
  } else {
    const compoundFactor = Math.pow(1 + periodicRate, totalPeriods);
    // PV = PMT * (1 - (1+i)^-n) / i + FV * (1+i)^-n
    // PMT = (PV - FV * (1+i)^-n) * i / (1 - (1+i)^-n)
    const numerator = initialCapitalCorpus - targetEndingCorpus / compoundFactor;
    const denominator = (1 - 1 / compoundFactor) / periodicRate;
    periodicPayout = numerator / denominator;
  }

  const annualizedPayout = periodicPayout * periodsPerYear;
  const totalPayoutOverDuration = periodicPayout * totalPeriods;

  const schedule: AnnuityPeriodPoint[] = [];
  let balance = initialCapitalCorpus;
  let totalInterest = 0;

  for (let p = 1; p <= totalPeriods; p++) {
    const year = Number((p / periodsPerYear).toFixed(1));
    const interestEarned = balance * periodicRate;
    totalInterest += interestEarned;
    const principalDecay = Math.max(0, periodicPayout - interestEarned);
    balance = Math.max(0, balance - principalDecay);

    // Sample data points: For monthly, sample every 3 months or per year to keep chart snappy
    const isSamplePoint =
      payoutFrequency === 'monthly'
        ? p % 3 === 0 || p === totalPeriods
        : payoutFrequency === 'quarterly'
        ? p % 2 === 0 || p === totalPeriods
        : true;

    if (isSamplePoint) {
      schedule.push({
        periodLabel:
          payoutFrequency === 'monthly'
            ? `Mo ${p}`
            : payoutFrequency === 'quarterly'
            ? `Q${p}`
            : `Yr ${p}`,
        year,
        payoutAmount: Math.round(periodicPayout),
        interestEarned: Math.round(interestEarned),
        principalDecay: Math.round(principalDecay),
        endingBalance: Math.round(balance),
      });
    }
  }

  return {
    periodicPayout: Math.round(periodicPayout),
    annualizedPayout: Math.round(annualizedPayout),
    totalPayoutOverDuration: Math.round(totalPayoutOverDuration),
    totalInterestEarned: Math.round(totalInterest),
    effectiveYield: assumedAnnualYield,
    capitalDecaySchedule: schedule,
  };
}
