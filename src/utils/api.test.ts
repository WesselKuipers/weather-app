import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { setupServer } from 'msw/node';
import axios from 'axios';
import { fetchCity, fetchWeather } from './api';
import { handlers } from './mocks';
import weatherResponse from './fixtures/weatherResponse.json';
import cityResponse from './fixtures/cityResponse.json';

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('fetchWeather', () => {
  it('should call the One Call API', async () => {
    const spy = vi.spyOn(axios, 'get');
    const result = await fetchWeather({ latitude: 51.51, longitude: -0.13 });

    expect(result).toStrictEqual(weatherResponse);
    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe('https://api.openweathermap.org/data/2.5/onecall');
    expect(spy.mock.calls[0][1]).toMatchObject({
      params: {
        exclude: 'minutely,hourly,alerts',
        lat: 51.51,
        lon: -0.13,
        units: 'metric',
      },
    });
  });
});

describe('fetchCity', () => {
  it('should call the Reverse GeoCode API', async () => {
    const spy = vi.spyOn(axios, 'get');
    const result = await fetchCity({ latitude: 51.51, longitude: -0.13 });

    expect(result).toStrictEqual(cityResponse);
    expect(spy).toBeCalledTimes(1);
    expect(spy.mock.calls[0][0]).toBe('https://api.openweathermap.org/geo/1.0/reverse');
    expect(spy.mock.calls[0][1]).toMatchObject({
      params: {
        lat: 51.51,
        lon: -0.13,
        limit: 1,
      },
    });
  });
});
