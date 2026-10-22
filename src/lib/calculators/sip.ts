import { SIPCalculatorInputs, SIPResult, SIPYearlyPoint } from '@/types';

/**
 * Calculates SIP vs Lumpsum growth over time with exact mathematical fidelity
 */
export function calculateSIPvsLumpsum(inputs: SIPCalculatorInputs): SIPResult {
  const { monthlyInstallment, tenureYears, expectedReturnRate, lumpsumSeedFund } = inputs;

  const r = expectedReturnRate / 100;
  const monthlyRate = r / 12;
  const totalMonths = Math.max(1, Math.round(tenureYears * 12));

  // SIP Future Value formula: P * [((1 + i)^n - 1) / i] * (1 + i)
  let finalSipValue = 0;
  if (monthlyRate === 0) {
    finalSipValue = monthlyInstallment * totalMonths;
  } else {
    finalSipValue =
      monthlyInstallment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const totalSipInvested = monthlyInstallment * totalMonths;
  const totalSipReturns = Math.max(0, finalSipValue - totalSipInvested);

  // Lumpsum Future Value formula: L * (1 + r)^t
  const finalLumpsumValue = lumpsumSeedFund * Math.pow(1 + r, tenureYears);
  const totalLumpsumInvested = lumpsumSeedFund;
  const totalLumpsumReturns = Math.max(0, finalLumpsumValue - totalLumpsumInvested);

  const combinedInvested = totalSipInvested + totalLumpsumInvested;
  const combinedFinalValue = finalSipValue + finalLumpsumValue;
  const combinedWealthGain = Math.max(0, combinedFinalValue - combinedInvested);

  // Generate Year-by-Year Curve Data
  const yearlyData: SIPYearlyPoint[] = [];

  // Year 0
  yearlyData.push({
    year: 0,
    sipInvested: 0,
    sipReturns: 0,
    sipTotal: 0,
    lumpsumInvested: lumpsumSeedFund,
    lumpsumReturns: 0,
    lumpsumTotal: lumpsumSeedFund,
    combinedTotal: lumpsumSeedFund,
  });

  const fullYears = Math.ceil(tenureYears);
  for (let y = 1; y <= fullYears; y++) {
    const currentMonths = Math.min(totalMonths, y * 12);
    const fractionYears = Math.min(tenureYears, y);

    let sipValAtYear = 0;
    if (monthlyRate === 0) {
      sipValAtYear = monthlyInstallment * currentMonths;
    } else {
      sipValAtYear =
        monthlyInstallment *
        ((Math.pow(1 + monthlyRate, currentMonths) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }
    const sipInvAtYear = monthlyInstallment * currentMonths;
    const sipRetAtYear = Math.max(0, sipValAtYear - sipInvAtYear);

    const lumpValAtYear = lumpsumSeedFund * Math.pow(1 + r, fractionYears);
    const lumpRetAtYear = Math.max(0, lumpValAtYear - lumpsumSeedFund);

    yearlyData.push({
      year: y,
      sipInvested: Math.round(sipInvAtYear),
      sipReturns: Math.round(sipRetAtYear),
      sipTotal: Math.round(sipValAtYear),
      lumpsumInvested: Math.round(lumpsumSeedFund),
      lumpsumReturns: Math.round(lumpRetAtYear),
      lumpsumTotal: Math.round(lumpValAtYear),
      combinedTotal: Math.round(sipValAtYear + lumpValAtYear),
    });
  }

  return {
    totalSipInvested: Math.round(totalSipInvested),
    totalSipReturns: Math.round(totalSipReturns),
    finalSipValue: Math.round(finalSipValue),
    totalLumpsumInvested: Math.round(totalLumpsumInvested),
    totalLumpsumReturns: Math.round(totalLumpsumReturns),
    finalLumpsumValue: Math.round(finalLumpsumValue),
    combinedInvested: Math.round(combinedInvested),
    combinedFinalValue: Math.round(combinedFinalValue),
    combinedWealthGain: Math.round(combinedWealthGain),
    yearlyData,
  };
}
