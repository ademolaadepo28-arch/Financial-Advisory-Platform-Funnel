import { NPVInputs, NPVResult, NPVPeriodPoint } from '@/types';

/**
 * Calculates Net Present Value (NPV), Internal Rate of Return (IRR), and Payback Periods
 */
export function calculateNPVValuation(inputs: NPVInputs): NPVResult {
  const { discountRatePercentage, initialCashOutflow, cashflows } = inputs;

  const r = discountRatePercentage / 100;
  const periodsData: NPVPeriodPoint[] = [];

  let cumulativeUndiscounted = -initialCashOutflow;
  let cumulativeDiscounted = -initialCashOutflow;
  let totalNominalInflows = 0;
  let totalDiscountedInflows = 0;

  // Period 0
  periodsData.push({
    period: 0,
    nominalCashflow: -initialCashOutflow,
    discountFactor: 1.0,
    discountedCashflow: -initialCashOutflow,
    cumulativeUndiscounted: Math.round(cumulativeUndiscounted),
    cumulativeDiscounted: Math.round(cumulativeDiscounted),
  });

  let undiscountedPaybackPeriod: number | null = null;
  let discountedPaybackPeriod: number | null = null;

  for (const item of cashflows) {
    const t = item.period;
    const cf = item.cashflow;
    totalNominalInflows += cf;

    const discountFactor = Math.pow(1 + r, -t);
    const discountedCf = cf * discountFactor;
    totalDiscountedInflows += discountedCf;

    const prevUndisc = cumulativeUndiscounted;
    cumulativeUndiscounted += cf;

    const prevDisc = cumulativeDiscounted;
    cumulativeDiscounted += discountedCf;

    // Check undiscounted payback
    if (undiscountedPaybackPeriod === null && cumulativeUndiscounted >= 0 && prevUndisc < 0) {
      const fraction = Math.abs(prevUndisc) / cf;
      undiscountedPaybackPeriod = Number(((t - 1) + fraction).toFixed(2));
    }

    // Check discounted payback
    if (discountedPaybackPeriod === null && cumulativeDiscounted >= 0 && prevDisc < 0) {
      const fraction = Math.abs(prevDisc) / discountedCf;
      discountedPaybackPeriod = Number(((t - 1) + fraction).toFixed(2));
    }

    periodsData.push({
      period: t,
      nominalCashflow: Math.round(cf),
      discountFactor: Number(discountFactor.toFixed(4)),
      discountedCashflow: Math.round(discountedCf),
      cumulativeUndiscounted: Math.round(cumulativeUndiscounted),
      cumulativeDiscounted: Math.round(cumulativeDiscounted),
    });
  }

  const npv = totalDiscountedInflows - initialCashOutflow;
  const profitabilityIndex =
    initialCashOutflow > 0 ? Number((totalDiscountedInflows / initialCashOutflow).toFixed(2)) : 0;

  // Calculate IRR using Newton-Raphson
  const irr = calculateIRR(initialCashOutflow, cashflows);

  return {
    npv: Math.round(npv),
    irr,
    undiscountedPaybackPeriod,
    discountedPaybackPeriod,
    totalNominalInflows: Math.round(totalNominalInflows),
    totalDiscountedInflows: Math.round(totalDiscountedInflows),
    profitabilityIndex,
    isViable: npv > 0,
    periodsData,
  };
}

/**
 * Newton-Raphson approximation for IRR
 */
function calculateIRR(initialOutflow: number, cashflows: { period: number; cashflow: number }[]): number | null {
  if (cashflows.length === 0 || initialOutflow <= 0) return null;

  const maxIterations = 100;
  const tolerance = 0.00001;
  let rate = 0.1; // initial guess 10%

  for (let i = 0; i < maxIterations; i++) {
    let npvVal = -initialOutflow;
    let derivative = 0;

    for (const cf of cashflows) {
      const t = cf.period;
      const factor = Math.pow(1 + rate, t);
      npvVal += cf.cashflow / factor;
      derivative -= (t * cf.cashflow) / (factor * (1 + rate));
    }

    if (Math.abs(npvVal) < tolerance) {
      return Number((rate * 100).toFixed(2));
    }

    if (Math.abs(derivative) < 0.000001) break;

    const nextRate = rate - npvVal / derivative;
    if (nextRate <= -1.0) {
      rate = rate / 2;
    } else {
      rate = nextRate;
    }
  }

  return rate > -1.0 && rate < 10.0 ? Number((rate * 100).toFixed(2)) : null;
}
