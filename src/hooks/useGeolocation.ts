import { useCallback, useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { Coordinates } from '@/types';

interface GeoLocation {
  coordinates?: Coordinates;
  error?: string;
  fetchCoordinates: () => void;
}

/**
 * A hook that fetches the user’s geolocation.
 *
 * @returns - An object containing the current location, the error if present, and a function to try fetching the geolocation again.
 */
export function useGeoLocation(): GeoLocation {
  const [coordinates, setCoordinates] = useState<Coordinates>();
  const [error, setError] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const interval = useInterval(() => fetchCoordinates, 1000);

  const onGetCoordinates = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) => {
      setCoordinates({ latitude, longitude });
      interval.stop();
    },
    [],
  );

  const onError = useCallback((e: GeolocationPositionError) => {
    setError(e.message);
    interval.start();
  }, []);

  const fetchCoordinates = useCallback(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation API is not supported.');
      return;
    }

    navigator.geolocation.getCurrentPosition(onGetCoordinates, onError);
  }, []);

  useEffect(() => {
    fetchCoordinates();
  }, []);

  return { coordinates, error, fetchCoordinates };
}
