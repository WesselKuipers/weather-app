import { describe, expect, it } from 'vitest';
import { convertTemperature } from './convertTemperature';

describe('convertTemperature', () => {
  it('should convert Celcius to Fahrenheit', () => {
    const result = convertTemperature(100, 'F');
    expect(result).toStrictEqual(212);
  });

  it('should return the degrees in Celsius when converting to Celsius', () => {
    const result = convertTemperature(100);
    expect(result).toStrictEqual(100);
  });
});
