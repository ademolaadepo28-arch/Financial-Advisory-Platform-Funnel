// Indian Currency & Financial Number Formatting Utilities

/**
 * Formats a number in Indian Rupee format (e.g. ₹1,50,000 or ₹1.5 Cr)
 */
export function formatINR(val: number, options: { compact?: boolean; decimals?: number } = {}): string {
  if (isNaN(val) || !isFinite(val)) return '₹0';
  const { compact = false, decimals = 2 } = options;

  if (compact) {
    const absVal = Math.abs(val);
    const sign = val < 0 ? '-' : '';
    if (absVal >= 10000000) {
      // Crores
      return `${sign}₹${(absVal / 10000000).toFixed(decimals)} Cr`;
    } else if (absVal >= 100000) {
      // Lakhs
      return `${sign}₹${(absVal / 100000).toFixed(decimals)} L`;
    } else if (absVal >= 1000) {
      // Thousands
      return `${sign}₹${(absVal / 1000).toFixed(1)}k`;
    }
  }

  // Standard Indian comma separator: 12,34,567
  const isNegative = val < 0;
  const rounded = Math.round(Math.abs(val)).toString();
  let lastThree = rounded.substring(rounded.length - 3);
  const otherNumbers = rounded.substring(0, rounded.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  return `${isNegative ? '-' : ''}₹${formatted}`;
}

/**
 * Formats number as percentage (e.g. 12.5%)
 */
export function formatPercentage(val: number, decimals: number = 1): string {
  if (isNaN(val) || !isFinite(val)) return '0%';
  return `${val.toFixed(decimals)}%`;
}

/**
 * Formats tenure in years or years and months
 */
export function formatYears(years: number): string {
  if (years === 1) return '1 Year';
  return `${years} Years`;
}

/**
 * Clamp a number between min and max
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}
