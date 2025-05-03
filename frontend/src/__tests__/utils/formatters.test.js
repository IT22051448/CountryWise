import { formatPopulation, formatTimezone } from '@/utils/formatters';

describe('formatPopulation', () => {
  it('returns raw number when less than 1,000', () => {
    expect(formatPopulation(0)).toBe(0);
    expect(formatPopulation(42)).toBe(42);
    expect(formatPopulation(999)).toBe(999);
  });

  it('formats thousands with one decimal and "K"', () => {
    expect(formatPopulation(1000)).toBe('1.0K');
    expect(formatPopulation(1234)).toBe('1.2K');
    expect(formatPopulation(999_499)).toBe('999.5K');
  });

  it('formats millions with one decimal and "M"', () => {
    expect(formatPopulation(1_000_000)).toBe('1.0M');
    expect(formatPopulation(2_530_000)).toBe('2.5M');
    expect(formatPopulation(999_499_999)).toBe('999.5M');
  });

  it('formats billions with one decimal and "B"', () => {
    expect(formatPopulation(1_000_000_000)).toBe('1.0B');
    expect(formatPopulation(2_345_000_000)).toBe('2.3B');
    expect(formatPopulation(9_999_999_999)).toBe('10.0B');
  });
});

describe('formatTimezone', () => {
  it('adds "+" sign for non-negative offsets', () => {
    expect(formatTimezone(0)).toBe('UTC+0');
    expect(formatTimezone(3)).toBe('UTC+3');
    expect(formatTimezone(10)).toBe('UTC+10');
  });

  it('preserves negative sign for negative offsets', () => {
    expect(formatTimezone(-1)).toBe('UTC-1');
    expect(formatTimezone(-5)).toBe('UTC-5');
    expect(formatTimezone(-12)).toBe('UTC-12');
  });
});
