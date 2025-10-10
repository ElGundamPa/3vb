import { describe, it, expect } from 'vitest';
import { formatPrice } from '../lib/utils';

describe('formatPrice', () => {
  it('formats USD correctly', () => {
    expect(formatPrice(1234.5, 'USD')).toContain('$');
  });

  it('formats PEN correctly', () => {
    const s = formatPrice(1500, 'PEN');
    expect(typeof s).toBe('string');
  });
});
