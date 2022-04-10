import { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Loader, Space } from '@mantine/core';
import { useGeolocation } from '@/hooks/useGeolocation';
import { CurrentWeather } from '../CurrentWeather';
import { Forecast } from '../Forecast';
import { fetchCityMock, fetchWeatherMock } from '@/utils/api';
import styles from './index.module.css';

/**
 * The main component handling the content of the app.
 */
export function Weather(): ReactElement {
  const location = useGeolocation();

  // This could technically be extracted to a separate custom hook,
  // but given this project’s scope it’s overkill.
  const weatherQuery = useQuery(['weather', location.coordinates], () => fetchWeatherMock(), {
    // Only fetch if the user’s coordinates are known.
    enabled: !!location.coordinates,

    // This option is nice to have if the user keeps this app open for long periods of time.
    refetchOnWindowFocus: true,

    // Consider any data older than 1 hour to be stale. This helps with rate limiting.
    staleTime: 1000 * 60 * 60,
  });
  const cityQuery = useQuery(['city', location.coordinates], () => fetchCityMock(), {
    enabled: !!location.coordinates,
    // This isn’t expected to change over time, unlike the weather.
    refetchOnWindowFocus: false,
  });

  if (weatherQuery.status === 'loading' || !weatherQuery.data || !cityQuery.data) {
    return <Loader size="xl" variant="bars" />;
  }

  return (
    <div className={styles.container}>
      <CurrentWeather city={cityQuery.data} current={weatherQuery.data.current} />
      <Space h="md" />
      <Forecast forecast={weatherQuery.data.daily.slice(1, 6)} />
    </div>
  );
}
