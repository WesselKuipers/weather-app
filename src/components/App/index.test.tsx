import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { handlers } from '@/utils/mocks';
import { App } from '.';
import '@/i18n/test';

const server = setupServer(...handlers);

async function renderApp() {
  // For these tests we don’t need React 18’s concurrent API.
  const result = render(<App />, { legacyRoot: true });
  await waitFor(() =>
    // getAllByTitle throws an error if it cannot find an element
    screen.getAllByTitle('broken clouds'),
  );

  return result;
}

beforeEach(async () => {
  // Override the navigator’s geolocation API so it doesn’t have to ask for permissions.
  Object.assign(navigator, {
    geolocation: {
      getCurrentPosition: vi.fn((success) => {
        return Promise.resolve(
          success({
            coords: { latitude: 0, longitude: 0 },
            timestamp: 0,
          }),
        );
      }),
    },
  });

  // This is used internally by Mantine. We can safely mock it here.
  Object.defineProperty(global, 'ResizeObserver', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    })),
  });
});

// Using vitest’s test teardown process, the cleanup doesn’t get properly picked up yet.
afterEach(cleanup);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

describe('App', () => {
  it('should switch the units', async () => {
    await renderApp();

    const celcius = screen.findByText('Feels like 9°C');
    const kmh = screen.findByText('15 km/h');

    await userEvent.click(await screen.findByText('°F'));

    const fahrenheit = screen.findByText('Feels like 48°F');
    const mph = screen.findByText('2 mph');

    expect(celcius).toBeDefined();
    expect(kmh).toBeDefined();
    expect(fahrenheit).toBeDefined();
    expect(mph).toBeDefined();
  });

  it('should switch the theme', async () => {
    await renderApp();

    const clouds = screen.getAllByTitle('broken clouds')[0].parentNode as SVGElement;
    const toggle = await screen.findByTitle('Toggle color scheme');

    await userEvent.click(toggle);
    expect(clouds.getAttribute('color')).toStrictEqual('#fff');

    await userEvent.click(toggle);
    expect(clouds.getAttribute('color')).toStrictEqual('#495057');
  });

  it('should switch the language', async () => {
    await renderApp();

    const feelsLikeEN = screen.findByText('Feels like', { exact: false });
    const mondayEN = screen.findByText('Monday');

    await userEvent.click(await screen.findByLabelText('Select language'));
    await userEvent.click(await screen.findByText('Nederlands'));

    const feelsLikeNL = screen.findByText('Gevoelstemperatuur:', { exact: false });
    const mondayNL = screen.findByText('Maandag');

    expect(feelsLikeEN).toBeDefined();
    expect(feelsLikeNL).toBeDefined();
    expect(mondayEN).toBeDefined();
    expect(mondayNL).toBeDefined();
  });
});
