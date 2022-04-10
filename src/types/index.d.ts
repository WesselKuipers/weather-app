/**
 * Coordinates representing the user’s current location.
 */
export interface Coordinates {
  longitude: number;
  latitude: number;
}

/**
 * The structure of the response from OpenWeather’s Reverse Geocoding API endpoint.
 *
 * See {@link https://openweathermap.org/api/geocoding-api#reverse} for more details.
 */
export interface CityResponse {
  /**
   * Name of the found location.
   */
  name: string;

  /**
   * A mapping of language IDs and translated names.
   */
  local_names: Record<string, string>;

  /**
   * Geographical coordinates of the found location (latitude).
   */
  lat: number;

  /**
   * Geographical coordinates of the found location (longitude)
   */
  lon: number;

  /**
   * The country code of the found location.
   */
  country: string;

  /**
   * The state or province of the found location
   */
  state?: string;
}

/**
 * The structure of the response from OpenWeather’s One Call API endpoint.
 *
 * See {@link https://openweathermap.org/api/one-call-api} for more details.
 */
export interface WeatherResponse {
  /**
   * Geographical coordinates of the location (latitude).
   */
  lat: number;

  /**
   * Geographical coordinates of the location (longitude).
   */
  lon: number;

  /**
   * Timezone name for the requested location.
   */
  timezone: string;

  /**
   * Shift in seconds from UTC.
   */
  timezone_offset: number;

  /**
   * Current weather data API response.
   */
  current: CurrentWeather;

  /**
   * Daily forecast weather data API response.
   */
  daily: DailyForecast[];
}

/**
 * Metadata used for describing the weather’s condition.
 */
export interface WeatherDescription {
  /**
   * Weather condition id.
   *
   * See {@link https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2}
   */
  id: number;

  /**
   * Group of weather parameters (Rain, Snow, Extreme etc.).
   */
  main: string;

  /**
   * Weather condition within the group described in the target language.
   *
   * See {@link https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2}
   */
  description: string;

  /**
   * Weather icon id.
   *
   * See {@link https://openweathermap.org/weather-conditions#How-to-get-icon-URL}
   */
  icon: string;
}

/**
 * Data about the current weather.
 */
export interface CurrentWeather {
  /**
   * Current time, Unix, UTC.
   */
  dt: number;

  /**
   * Sunrise time, Unix, UTC
   */
  sunrise: number;

  /**
   * Sunset time, Unix, UTC
   */
  sunset: number;

  /**
   * The current temperature.
   */
  temp: number;

  /**
   * Temperature. This temperature parameter accounts for the human perception of weather.
   */
  feels_like: number;

  /**
   * Atmospheric pressure on the sea level, hPa
   */
  pressure: number;

  /**
   * Humidity, %.
   */
  humidity: number;

  /**
   * Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form.
   */
  dew_point: number;

  /**
   * Current UV index.
   */
  uvi: number;

  /**
   * Cloudiness, %.
   */
  clouds: number;

  /**
   * Average visibility, metres. The maximum value of the visibility is 10km.
   */
  visibility: number;

  /**
   * Wind speed in meters/sec or miles/hour.
   */
  wind_speed: number;

  /**
   * Wind direction, degrees (meteorological)
   */
  wind_deg: number;

  /**
   * Metadata used to describe the current weather.
   */
  weather: WeatherDescription[];
}

/**
 * An overview of temperatures in the provided unit.
 */
export interface TemperatureOverview {
  /**
   * Morning temperature.
   */
  day: number;

  /**
   * Min daily temperature.
   */
  min: number;

  /**
   * Max daily temperature.
   */
  max: number;

  /**
   * Night temperature.
   */
  night: number;

  /**
   * Evening temperature.
   */
  eve: number;

  /**
   * Morning temperature.
   */
  morn: number;
}

/**
 * The feeling of the temperature at various stages of the day.
 */
export interface FeelsLike {
  /**
   * Day temperature.
   */
  day: number;

  /**
   * Night temperature.
   */
  night: number;

  /**
   * Evening temperature.
   */
  eve: number;

  /**
   * Morning temperature.
   */
  morn: number;
}

/**
 * A daily forecast entry.
 */
export interface DailyForecast {
  /**
   * Time of the forecasted data, Unix, UTC.
   */
  dt: number;

  /**
   * Sunrise time, Unix, UTC.
   */
  sunrise: number;

  /**
   * Sunset time, Unix, UTC.
   */
  sunset: number;

  /**
   * The time of when the moon rises for this day, Unix, UTC.
   */
  moonrise: number;

  /**
   * The time of when the moon sets for this day, Unix, UTC
   */
  moonset: number;

  /**
   * Moon phase. `0` and `1` are 'new moon', `0.25` is 'first quarter moon',
   * `0.5` is 'full moon' and `0.75` is 'last quarter moon'.
   *
   * The periods in between are called 'waxing crescent', 'waxing gibous', 'waning gibous', and 'waning crescent', respectively.
   */
  moon_phase: number;

  /**
   * The temperature at various stages of the day.
   */
  temp: TemperatureOverview;

  /**
   * The temperature accounted for human perception of weather.
   */
  feels_like: FeelsLike;

  /**
   * Atmospheric pressure on the sea level, hPa.
   */
  pressure: number;

  /**
   * Humidity, %.
   */
  humidity: number;

  /**
   * Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form.
   */
  dew_point: number;

  /**
   * Wind speed in meters/sec or miles/hour.
   */
  wind_speed: number;

  /**
   * Wind direction, degrees (meteorological).
   */
  wind_deg: number;

  /**
   * Wind gusts in meters/sec or miles/hour.
   */
  wind_gust?: number;

  /**
   * Metadata used for describing the weather’s condition.
   *
   * The first entry is the primary description.
   */
  weather: WeatherDescription[];

  /**
   * Cloudiness, %
   */
  clouds: number;

  /**
   * Probability of precipitation.
   * The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%.
   */
  pop: number;

  /**
   * Precipitation volume, mm.
   */
  rain?: number;

  /**
   * Snow volume, mm.
   */
  snow?: number;

  /**
   * The maximum value of UV index for the day.
   */
  uvi: number;
}
