import { GoalSavingsInputs, GoalSavingsResult, GoalYearlyPoint } from '@/types';

/**
 * Calculates Goal Savings requirements, shortfall, and required step-up SIP curve
 */
export function calculateGoalSavings(inputs: GoalSavingsInputs): GoalSavingsResult {
  const {
    targetAmount,
    targetDateYears,
    existingSavings,
    riskAppetite,
    expectedInflation = 6,
  } = inputs;

  // Rate of return mapped to risk appetite
  let assumedReturnRate = 11.5;
  if (riskAppetite === 'conservative') assumedReturnRate = 8.0;
  if (riskAppetite === 'aggressive') assumedReturnRate = 14.0;

  const r = assumedReturnRate / 100;
  const monthlyRate = r / 12;
  const inf = expectedInflation / 100;
  const totalMonths = Math.max(1, Math.round(targetDateYears * 12));

  // Inflation-adjusted target
  const inflationAdjustedTarget = targetAmount * Math.pow(1 + inf, targetDateYears);

  // Future value of existing savings
  const futureValueOfExisting = existingSavings * Math.pow(1 + r, targetDateYears);
  const netShortfall = Math.max(0, inflationAdjustedTarget - futureValueOfExisting);

  // Required Flat Monthly SIP
  let requiredMonthlySip = 0;
  if (netShortfall > 0) {
    if (monthlyRate > 0) {
      const sipFactor =
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      requiredMonthlySip = netShortfall / sipFactor;
    } else {
      requiredMonthlySip = netShortfall / totalMonths;
    }
  }

  // Required 10% Step-Up SIP: Starts lower than flat SIP, increases 10% each year
  // We solve for initial P such that sum of yearly compounded SIPs equals netShortfall
  const stepUpRate = 0.10;
  let stepUpFactorSum = 0;
  const fullYears = Math.ceil(targetDateYears);

  for (let y = 1; y <= fullYears; y++) {
    const monthsInThisYear = Math.min(12, totalMonths - (y - 1) * 12);
    if (monthsInThisYear <= 0) break;
    const remainingYears = targetDateYears - y;
    const stepUpMultiplier = Math.pow(1 + stepUpRate, y - 1);

    // FV of 12 monthly installments of 1 unit in year y compounded till end of targetDateYears
    let yearSipFv = 0;
    if (monthlyRate > 0) {
      yearSipFv =
        ((Math.pow(1 + monthlyRate, monthsInThisYear) - 1) / monthlyRate) *
        (1 + monthlyRate) *
        Math.pow(1 + r, Math.max(0, remainingYears));
    } else {
      yearSipFv = monthsInThisYear;
    }
    stepUpFactorSum += stepUpMultiplier * yearSipFv;
  }

  const stepUpInitialMonthlySip = stepUpFactorSum > 0 ? netShortfall / stepUpFactorSum : 0;

  // Generate Year-by-Year Growth Curve Data
  const yearlyData: GoalYearlyPoint[] = [];

  yearlyData.push({
    year: 0,
    corpusWithExistingOnly: Math.round(existingSavings),
    corpusWithRequiredSip: Math.round(existingSavings),
    targetLine: Math.round(inflationAdjustedTarget),
  });

  for (let y = 1; y <= fullYears; y++) {
    const fractionYears = Math.min(targetDateYears, y);
    const monthsElapsed = Math.min(totalMonths, y * 12);

    const fvExistingAtY = existingSavings * Math.pow(1 + r, fractionYears);

    let fvSipAtY = 0;
    if (monthlyRate > 0) {
      fvSipAtY =
        requiredMonthlySip *
        ((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate) *
        (1 + monthlyRate);
    } else {
      fvSipAtY = requiredMonthlySip * monthsElapsed;
    }

    yearlyData.push({
      year: y,
      corpusWithExistingOnly: Math.round(fvExistingAtY),
      corpusWithRequiredSip: Math.round(fvExistingAtY + fvSipAtY),
      targetLine: Math.round(inflationAdjustedTarget),
    });
  }

  return {
    inflationAdjustedTarget: Math.round(inflationAdjustedTarget),
    assumedReturnRate,
    futureValueOfExisting: Math.round(futureValueOfExisting),
    netShortfall: Math.round(netShortfall),
    requiredMonthlySip: Math.round(requiredMonthlySip),
    requiredStepUpPercentage: 10,
    stepUpInitialMonthlySip: Math.round(stepUpInitialMonthlySip),
    yearlyData,
  };
}
