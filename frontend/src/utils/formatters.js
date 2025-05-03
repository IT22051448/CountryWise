export function formatPopulation(num) {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num;
}

export function formatTimezone(num) {
  return `UTC${num >= 0 ? '+' : ''}${num}`;
}
