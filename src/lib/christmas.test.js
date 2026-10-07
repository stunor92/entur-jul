import { describe, expect, it } from 'vitest';
import { firstAdventSunday, getSeason } from './christmas';

describe('firstAdventSunday', () => {
  it.each([
    [2023, '2023-12-03'],
    [2024, '2024-12-01'],
    [2025, '2025-11-30'],
    [2026, '2026-11-29'],
    [2028, '2028-12-03'],
  ])('%i -> %s', (year, expected) => {
    const d = firstAdventSunday(year);
    expect(d.getDay()).toBe(0);
    expect(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`).toBe(expected);
  });
});

describe('getSeason', () => {
  it('teller ned til advent før 1. søndag i advent', () => {
    expect(getSeason(new Date('2026-10-07T12:00')).phase).toBe('before-advent');
  });

  it('teller ned til julaften i advent', () => {
    const season = getSeason(new Date('2026-12-10T12:00'));
    expect(season.phase).toBe('advent');
    expect(season.target).toEqual(new Date(2026, 11, 24));
  });

  it('er jul 24.–26. desember', () => {
    expect(getSeason(new Date('2026-12-24T09:00')).phase).toBe('christmas');
  });

  it('teller mot neste års advent etter jul', () => {
    const season = getSeason(new Date('2026-12-28T12:00'));
    expect(season.phase).toBe('before-advent');
    expect(season.year).toBe(2027);
  });
});
