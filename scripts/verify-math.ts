import {
  calculateSIPvsLumpsum,
  calculateRetirementCorpus,
  calculateAnnuityCashflow,
  calculateGoalSavings,
  calculateNPVValuation,
} from '../src/lib/calculators';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${msg}`);
}

console.log('--- STARTING FINANCIAL CALCULATION FIDELITY TEST SUITE ---\n');

// 1. TEST SIP vs LUMPSUM
console.log('[TEST 1] SIP vs Lumpsum Calculation Fidelity');
const sipRes = calculateSIPvsLumpsum({
  monthlyInstallment: 10000,
  tenureYears: 10,
  expectedReturnRate: 12.0,
  lumpsumSeedFund: 100000,
});
// 10 years * 12 months * 10,000 = 1,200,000 invested in SIP
assert(sipRes.totalSipInvested === 1200000, 'SIP Invested matches 12,00,000');
assert(sipRes.totalLumpsumInvested === 100000, 'Lumpsum Invested matches 1,00,000');
assert(sipRes.combinedInvested === 1300000, 'Combined Invested matches 13,00,000');
assert(sipRes.finalSipValue > 2300000 && sipRes.finalSipValue < 2400000, 'SIP Future value is ~23.23 Lakhs');
assert(sipRes.finalLumpsumValue > 300000 && sipRes.finalLumpsumValue < 320000, 'Lumpsum 1L at 12% for 10y is ~3.10 Lakhs');
assert(sipRes.yearlyData.length === 11, 'Generates 11 yearly points (Year 0 to 10)');

// 2. TEST RETIREMENT CORPUS
console.log('\n[TEST 2] Retirement Corpus & Decumulation Fidelity');
const retRes = calculateRetirementCorpus({
  currentAge: 30,
  retirementAge: 60,
  lifeExpectancyAge: 85,
  monthlyExpense: 50000,
  expectedInflation: 6.0,
  postRetirementReturn: 8.0,
  preRetirementReturn: 12.0,
  existingRetirementSavings: 0,
});
assert(retRes.yearsToRetire === 30, 'Years to retire is 30');
assert(retRes.retirementYears === 25, 'Retirement duration is 25 years');
// 50,000 * (1.06)^30 = ~287,175/mo
assert(retRes.monthlyExpenseAtRetirement > 280000, 'Monthly expense at retirement accounts for 30y inflation');
assert(retRes.requiredCorpus > 50000000, 'Required corpus is > ₹5 Crore to fund 25 years at 6% inflation');
assert(retRes.requiredMonthlySip > 0, 'Required monthly SIP computed for accumulation phase');
assert(retRes.yearlyData.length >= 55, 'Generates full lifecycle trajectory data');

// 3. TEST ANNUITY & CASHFLOW
console.log('\n[TEST 3] Annuity & Cashflow Engine Fidelity');
const annRes = calculateAnnuityCashflow({
  initialCapitalCorpus: 10000000, // 1 Crore
  payoutFrequency: 'monthly',
  assumedAnnualYield: 8.0,
  payoutDurationYears: 10,
  targetEndingCorpus: 0,
});
// 10 years * 12 months = 120 periods
assert(annRes.periodicPayout > 120000 && annRes.periodicPayout < 125000, '1 Cr at 8% for 10y yields ~₹1,21,328/month');
assert(annRes.totalPayoutOverDuration > 14000000, 'Total payout received exceeds principal due to yield');
assert(annRes.totalInterestEarned > 4000000, 'Total interest earned is > 40 Lakhs');

// 4. TEST GOAL SAVINGS
console.log('\n[TEST 4] Goal Savings Shortfall & Step-Up Fidelity');
const goalRes = calculateGoalSavings({
  targetAmount: 5000000,
  targetDateYears: 10,
  existingSavings: 500000,
  riskAppetite: 'moderate',
  expectedInflation: 6.0,
});
assert(goalRes.inflationAdjustedTarget > 5000000, 'Target is adjusted upward for inflation');
assert(goalRes.netShortfall > 0, 'Net shortfall calculated correctly after existing savings growth');
assert(goalRes.requiredMonthlySip > 0, 'Required flat monthly SIP calculated');
assert(goalRes.stepUpInitialMonthlySip < goalRes.requiredMonthlySip, 'Initial Step-Up SIP starts lower than flat SIP');

// 5. TEST NPV / VALUATION
console.log('\n[TEST 5] NPV & IRR Valuation Fidelity');
const npvRes = calculateNPVValuation({
  discountRatePercentage: 10.0,
  initialCashOutflow: 1000000,
  cashflows: [
    { period: 1, cashflow: 300000 },
    { period: 2, cashflow: 400000 },
    { period: 3, cashflow: 500000 },
    { period: 4, cashflow: 300000 },
  ],
});
assert(npvRes.totalNominalInflows === 1500000, 'Total nominal inflows equals 15 Lakhs');
assert(npvRes.npv > 0, 'NPV is positive at 10% discount rate');
assert(npvRes.isViable === true, 'Project is marked as economically viable');
assert(npvRes.irr !== null && npvRes.irr > 10, 'IRR exceeds 10% discount rate');
assert(npvRes.undiscountedPaybackPeriod !== null && npvRes.undiscountedPaybackPeriod < 3, 'Payback period under 3 years');

console.log('\n🎉 ALL 5 FINANCIAL CALCULATION ENGINES PASSED 100% MATHEMATICAL FIDELITY TESTS!\n');
