import { useCallback, useEffect, useState } from 'react';
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
export function useGeolocation(): GeoLocation {
  const [coordinates, setCoordinates] = useState<Coordinates>();
  const [error, setError] = useState('');

  const onGetCoordinates = useCallback(
    ({ coords: { latitude, longitude } }: GeolocationPosition) => {
      setCoordinates({ latitude, longitude });
    },
    [],
  );

  const onError = useCallback((e: GeolocationPositionError) => {
    setError(e.message);
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
