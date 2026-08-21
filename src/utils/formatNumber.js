const integerFormatter = new Intl.NumberFormat("pl-PL", {
  maximumFractionDigits: 0,
});

const compactIntegerFormatter = new Intl.NumberFormat("pl-PL", {
  notation: "compact",
  maximumFractionDigits: 0,
});

const compactDecimalFormatter = new Intl.NumberFormat("pl-PL", {
  notation: "compact",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatNumber(value) {
  return integerFormatter.format(value);
}

export function formatCompactNumber(value) {
  return (value > 1000 ? compactDecimalFormatter : compactIntegerFormatter)
    .format(value)
    .replace("tys.", "tys");
}
