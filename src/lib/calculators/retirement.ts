import { RetirementInputs, RetirementResult, RetirementYearlyPoint } from '@/types';

/**
 * Calculates Retirement Corpus requirements, accumulation curve, and decumulation trajectory
 */
export function calculateRetirementCorpus(inputs: RetirementInputs): RetirementResult {
  const {
    currentAge,
    retirementAge,
    lifeExpectancyAge = 85,
    monthlyExpense,
    expectedInflation,
    postRetirementReturn,
    preRetirementReturn = 12,
    existingRetirementSavings = 0,
  } = inputs;

  const yearsToRetire = Math.max(1, retirementAge - currentAge);
  const retirementYears = Math.max(1, lifeExpectancyAge - retirementAge);

  const inf = expectedInflation / 100;
  const rPost = postRetirementReturn / 100;
  const rPre = preRetirementReturn / 100;

  // 1. Future Expense at Retirement
  const presentAnnualExpense = monthlyExpense * 12;
  const annualExpenseAtRetirement = presentAnnualExpense * Math.pow(1 + inf, yearsToRetire);
  const monthlyExpenseAtRetirement = annualExpenseAtRetirement / 12;

  // 2. Real Rate of Return post-retirement
  // r_real = (1 + r_post) / (1 + inf) - 1
  let realRate = (1 + rPost) / (1 + inf) - 1;
  if (Math.abs(realRate) < 0.0001) {
    realRate = 0.0001; // prevent divide-by-zero
  }

  // 3. Required Corpus at Retirement (Annuity Due)
  // PV = E_ret * [ (1 - (1 + r_real)^(-n)) / r_real ] * (1 + r_real)
  const requiredCorpus =
    annualExpenseAtRetirement *
    ((1 - Math.pow(1 + realRate, -retirementYears)) / realRate) *
    (1 + realRate);

  // 4. Future Value of Existing Savings at Retirement
  const futureValueOfExistingSavings = existingRetirementSavings * Math.pow(1 + rPre, yearsToRetire);
  const netCorpusShortfall = Math.max(0, requiredCorpus - futureValueOfExistingSavings);

  // 5. Monthly SIP needed during accumulation to cover shortfall
  const monthlyAccumRate = rPre / 12;
  const totalAccumMonths = yearsToRetire * 12;
  let requiredMonthlySip = 0;
  if (netCorpusShortfall > 0) {
    if (monthlyAccumRate > 0) {
      const fvFactor =
        ((Math.pow(1 + monthlyAccumRate, totalAccumMonths) - 1) / monthlyAccumRate) *
        (1 + monthlyAccumRate);
      requiredMonthlySip = netCorpusShortfall / fvFactor;
    } else {
      requiredMonthlySip = netCorpusShortfall / totalAccumMonths;
    }
  }

  // 6. Year-by-Year Accumulation and Decumulation Trajectory
  const yearlyData: RetirementYearlyPoint[] = [];

  // Phase A: Accumulation (Current Age -> Retirement Age)
  let runningCorpus = existingRetirementSavings;
  for (let age = currentAge; age <= retirementAge; age++) {
    const yearsElapsed = age - currentAge;
    const expenseAtAge = presentAnnualExpense * Math.pow(1 + inf, yearsElapsed);

    if (age === currentAge) {
      yearlyData.push({
        age,
        phase: 'accumulation',
        corpusValue: Math.round(runningCorpus),
        annualExpense: Math.round(expenseAtAge),
        annualContribution: Math.round(requiredMonthlySip * 12),
      });
    } else {
      // Compound previous corpus and add annual contributions
      const monthsElapsed = (age - currentAge) * 12;
      const fvExisting = existingRetirementSavings * Math.pow(1 + rPre, yearsElapsed);
      let fvSip = 0;
      if (monthlyAccumRate > 0) {
        fvSip =
          requiredMonthlySip *
          ((Math.pow(1 + monthlyAccumRate, monthsElapsed) - 1) / monthlyAccumRate) *
          (1 + monthlyAccumRate);
      } else {
        fvSip = requiredMonthlySip * monthsElapsed;
      }
      runningCorpus = fvExisting + fvSip;

      yearlyData.push({
        age,
        phase: 'accumulation',
        corpusValue: Math.round(runningCorpus),
        annualExpense: Math.round(expenseAtAge),
        annualContribution: Math.round(requiredMonthlySip * 12),
      });
    }
  }

  // Phase B: Decumulation (Retirement Age -> Life Expectancy or Depletion)
  let decumulationBalance = requiredCorpus;
  let currentWithdrawal = annualExpenseAtRetirement;
  let exhaustionAge = lifeExpectancyAge;
  let hasExhausted = false;

  for (let age = retirementAge + 1; age <= Math.max(lifeExpectancyAge, 95); age++) {
    // Withdrawal at start of year
    decumulationBalance = Math.max(0, decumulationBalance - currentWithdrawal);

    // Balance grows at postRetirementReturn during the year
    decumulationBalance = decumulationBalance * (1 + rPost);

    // Next year's withdrawal increases with inflation
    currentWithdrawal = currentWithdrawal * (1 + inf);

    if (decumulationBalance <= 0 && !hasExhausted) {
      exhaustionAge = age;
      hasExhausted = true;
    }

    if (age <= lifeExpectancyAge || !hasExhausted) {
      yearlyData.push({
        age,
        phase: 'distribution',
        corpusValue: Math.round(Math.max(0, decumulationBalance)),
        annualExpense: Math.round(currentWithdrawal),
        annualContribution: 0,
      });
    }

    if (hasExhausted && age > lifeExpectancyAge) break;
  }

  return {
    yearsToRetire,
    retirementYears,
    monthlyExpenseAtRetirement: Math.round(monthlyExpenseAtRetirement),
    annualExpenseAtRetirement: Math.round(annualExpenseAtRetirement),
    realRateOfReturn: Number((realRate * 100).toFixed(2)),
    requiredCorpus: Math.round(requiredCorpus),
    futureValueOfExistingSavings: Math.round(futureValueOfExistingSavings),
    netCorpusShortfall: Math.round(netCorpusShortfall),
    requiredMonthlySip: Math.round(requiredMonthlySip),
    exhaustionAge: hasExhausted ? exhaustionAge : lifeExpectancyAge,
    yearlyData,
  };
}
