const integerFormatter = new Intl.NumberFormat("pl-PL", {
  maximumFractionDigits: 0,
});

export function formatNumber(value) {
  return integerFormatter.format(value);
}
