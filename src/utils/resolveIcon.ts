import { IconType } from 'react-icons';
import {
  WiCloud,
  WiCloudy,
  WiDayRain,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from 'react-icons/wi';
import { FaQuestion } from 'react-icons/fa';

const weatherMap = {
  '01': WiDaySunny,
  '02': WiDaySunnyOvercast,
  '03': WiCloud,
  '04': WiCloudy,
  '09': WiRain,
  '10': WiDayRain,
  '11': WiThunderstorm,
  '13': WiSnow,
  '50': WiFog,
};

/**
 * Resolve an OpenWeather code to a WeatherIcon icon.
 *
 * See {@link https://openweathermap.org/weather-conditions} for more information.
 * @param weatherCode The OpenWeather code of the icon.
 * @returns - The corresponding WeatherIcon, or a question mark icon if unknown
 */
export function resolveIcon(weatherCode: string): IconType {
  const code = weatherCode.replace(/n|d/g, '');
  return weatherMap[code as keyof typeof weatherMap] ?? FaQuestion;
}
