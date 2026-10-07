import { describe, expect, it } from 'vitest';
import { getSleighStatus, ROUTE } from './sleigh';

const at = (iso) => new Date(iso);
const stop = (name) => ROUTE.find((s) => s.name === name);

describe('getSleighStatus', () => {
  it('står i verkstedet på Nordpolen før avgang julaften', () => {
    const status = getSleighStatus(at('2026-10-07T12:00'));
    expect(status.phase).toBe('verksted');
    expect(status.position).toEqual([stop('Nordpolen').lat, stop('Nordpolen').lng]);
    expect(status.text).toContain('16:00');
  });

  it('er i Bergen når klokka er 17:00 julaften', () => {
    const status = getSleighStatus(at('2026-12-24T17:00'));
    expect(status.phase).toBe('underveis');
    expect(status.position).toEqual([stop('Bergen').lat, stop('Bergen').lng]);
    expect(status.text).toContain('Bergen');
  });

  it('ligger midt mellom to stopp halvveis i tiden', () => {
    const bergen = stop('Bergen');
    const oslo = stop('Oslo');
    const midpoint = new Date(new Date(2026, 11, 24).getTime() + ((bergen.minutes + oslo.minutes) / 2) * 60000);
    const [lat, lng] = getSleighStatus(midpoint).position;
    expect(lat).toBeCloseTo((bergen.lat + oslo.lat) / 2, 5);
    expect(lng).toBeCloseTo((bergen.lng + oslo.lng) / 2, 5);
  });

  it('oppgir neste stopp underveis', () => {
    expect(getSleighStatus(at('2026-12-24T17:05')).next).toBe('Oslo');
  });

  it('er hjemme på Nordpolen etter siste stopp', () => {
    const status = getSleighStatus(at('2026-12-25T12:00'));
    expect(status.phase).toBe('hjemme');
    expect(status.position).toEqual([stop('Nordpolen').lat, stop('Nordpolen').lng]);
  });
});
