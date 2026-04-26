/**
 * Formats a number into Indonesian Rupiah (IDR) currency format.
 * @param value - The numeric value to format.
 * @returns A formatted currency string (e.g., "Rp 1.000.000").
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a date into a localized string.
 * @param date - The date to format (Date object or ISO string).
 * @param locale - The locale to use (defaults to 'id-ID').
 * @param options - Intl.DateTimeFormatOptions for customization.
 * @returns A formatted date string.
 */
export const formatDate = (
  date: Date | string,
  locale: string = 'id-ID',
  options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  },
): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString(locale, options);
};

/**
 * Specialized formatter for transaction dates in activity lists.
 * Returns something like "26 Apr 20:30".
 */
export const formatTransactionDate = (date: Date | string): string => {
  return formatDate(date, 'id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).replace(',', '');
};

/**
 * Specialized formatter for month-year labels (e.g., "April 2026").
 */
export const formatMonthYear = (date: Date | string = new Date()): string => {
  return formatDate(date, 'en-US', {
    month: 'long',
    year: 'numeric',
  });
};
