/**
 * Format a number to Indonesian Rupiah currency format
 * Example: 350000 -> "350.000,00"
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatRupiah = (amount) => {
  if (!amount && amount !== 0) return "0,00";
  
  // Convert to number if it's a string
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Format with Indonesian locale: thousand separator = "." and decimal separator = ","
  return numAmount.toLocaleString('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Format a number to Indonesian Rupiah currency format with "Rp" prefix
 * Example: 350000 -> "Rp 350.000,00"
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string with Rp prefix
 */
export const formatRupiahWithPrefix = (amount) => {
  return `Rp ${formatRupiah(amount)}`;
};
