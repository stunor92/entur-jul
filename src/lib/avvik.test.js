import { describe, expect, it } from 'vitest';
import { getDailyAvvik, DECEMBER, ALL_YEAR } from './avvik';

const VARIANTS = ['information', 'success', 'warning', 'negative'];

describe('getDailyAvvik', () => {
  it('gir en egen melding for hver dag 1.–24. desember', () => {
    for (let day = 1; day <= 24; day++) {
      const avvik = getDailyAvvik(new Date(2026, 11, day, 12));
      expect(avvik).toBe(DECEMBER[day - 1]);
    }
  });

  it('har en melding for hver dag i året', () => {
    for (let d = new Date(2026, 0, 1); d.getFullYear() === 2026; d.setDate(d.getDate() + 1)) {
      const avvik = getDailyAvvik(new Date(d));
      expect(avvik.title).toBeTruthy();
      expect(avvik.text).toBeTruthy();
    }
  });

  it('bytter melding fra dag til dag utenfor desember', () => {
    const a = getDailyAvvik(new Date(2026, 9, 7, 12));
    const b = getDailyAvvik(new Date(2026, 9, 8, 12));
    expect(a).not.toBe(b);
  });

  it('er stabil gjennom døgnet', () => {
    expect(getDailyAvvik(new Date(2026, 9, 7, 0, 1))).toBe(getDailyAvvik(new Date(2026, 9, 7, 23, 59)));
  });

  it('bruker bare gyldige Linje-varianter', () => {
    for (const avvik of [...DECEMBER, ...ALL_YEAR]) {
      expect(VARIANTS).toContain(avvik.variant);
    }
  });
});
