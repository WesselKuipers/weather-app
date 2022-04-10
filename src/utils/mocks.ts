import { setupWorker, rest, SetupWorkerApi } from 'msw';
import weatherResponse from './fixtures/weatherResponse.json';
import cityResponse from './fixtures/cityResponse.json';

export function setupMockWorker(): SetupWorkerApi {
  const worker = setupWorker(
    rest.get('https://api.openweathermap.org/data/2.5/onecall*', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(weatherResponse));
    }),
    rest.get('https://api.openweathermap.org/geo/1.0/reverse*', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([cityResponse]));
    }),
  );

  return worker;
}
