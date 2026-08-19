const integerFormatter = new Intl.NumberFormat("pl-PL", {
  maximumFractionDigits: 0,
});

const compactFormatter = new Intl.NumberFormat("pl-PL", {
  notation: "compact",
  maximumFractionDigits: 0,
});

export function formatNumber(value) {
  return integerFormatter.format(value);
}

export function formatCompactNumber(value) {
  return compactFormatter.format(value);
}
