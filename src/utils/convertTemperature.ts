import { Unit } from '@/hooks/useUnit';

/**
 * Helper function to convert temperatures from Celcius to Fahrenheit.
 *
 * @param temperature The temperature in Celcius.
 * @param unit The unit to convert to.
 * @returns - The converted temperature.
 */
export function convertTemperature(temperature: number, unit: Unit = 'C'): number {
  if (unit === 'F') {
    return temperature * 1.8 + 32;
  }

  return temperature;
}
