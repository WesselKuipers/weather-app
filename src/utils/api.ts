import axios from 'axios';
import { WeatherResponse, CityResponse, Coordinates } from '@/types';

/**
 * Fetch the current weather from OpenWeatherMap
 *
 * @param coordinates The current geolocation of the user.
 * @param units The units to fetch.
 * @returns - A {@link WeatherResponse} based on the given location.
 */
export async function fetchWeather(
  coordinates: Coordinates,
  units: 'metric' | 'imperial' = 'metric',
): Promise<WeatherResponse> {
  const { data } = await axios.get<WeatherResponse>(
    `${import.meta.env.VITE_API_URL}/data/2.5/onecall`,
    {
      params: {
        lat: coordinates?.latitude,
        lon: coordinates?.longitude,
        units,
        appid: import.meta.env.VITE_API_KEY,
        exclude: 'minutely,hourly,alerts',
      },
    },
  );

  return data;
}

/**
 * Fetch the corresponding city of a given location.
 *
 * @param coordinates The coordinates to look up the city of.
 * @returns - A {@link CityResponse} based on the given location.
 */
export async function fetchCity(coordinates: Coordinates): Promise<CityResponse> {
  const { data } = await axios.get<CityResponse[]>(
    `${import.meta.env.VITE_API_URL}/geo/1.0/reverse`,
    {
      params: {
        lat: coordinates?.latitude,
        lon: coordinates?.longitude,
        appid: import.meta.env.VITE_API_KEY,
        limit: 1,
      },
    },
  );

  const [result] = data;
  return result;
}
