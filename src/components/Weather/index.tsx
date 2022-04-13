import { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { Alert, Grid, Modal, Skeleton, Space, Text } from '@mantine/core';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useGeoLocation } from '@/hooks/useGeolocation';
import { CurrentWeather } from '../CurrentWeather';
import { Forecast } from '../Forecast';
import { fetchCity, fetchWeather } from '@/utils/api';
import styles from './index.module.css';

/**
 * The general outline for the Weather component, this is used as a loading indicator.
 */
function WeatherSkeleton(): ReactElement {
  return (
    <div className={styles.container}>
      <Skeleton height={240} />
      <Space h="md" />
      <Grid columns={15} justify="center">
        <Grid.Col lg={3} md={6} sm={6} xs={4}>
          <Skeleton height={180} />
        </Grid.Col>
        <Grid.Col lg={3} md={6} sm={6} xs={4}>
          <Skeleton height={180} />
        </Grid.Col>
        <Grid.Col lg={3} md={6} sm={6} xs={4}>
          <Skeleton height={180} />
        </Grid.Col>
        <Grid.Col lg={3} md={6} sm={6} xs={4}>
          <Skeleton height={180} />
        </Grid.Col>
        <Grid.Col lg={3} md={6} sm={6} xs={4}>
          <Skeleton height={180} />
        </Grid.Col>
      </Grid>
    </div>
  );
}

/**
 * The main component handling the content of the app.
 */
export function Weather(): ReactElement {
  const location = useGeoLocation();
  const { t } = useTranslation();

  // This could technically be extracted to a separate custom hook,
  // but given this project’s scope it’s overkill.
  const weatherQuery = useQuery(
    ['weather', location.coordinates],
    () => fetchWeather(location.coordinates!),
    {
      // Only fetch if the user’s coordinates are known.
      enabled: !!location.coordinates,

      // This option is nice to have if the user keeps this app open for long periods of time.
      refetchOnWindowFocus: true,

      // Consider any data older than 1 hour to be stale. This helps with rate limiting.
      staleTime: 1000 * 60 * 60,
    },
  );
  const cityQuery = useQuery(
    ['city', location.coordinates],
    () => fetchCity(location.coordinates!),
    {
      enabled: !!location.coordinates,
      // This isn’t expected to change over time, unlike the weather.
      refetchOnWindowFocus: false,
    },
  );

  return (
    <>
      {weatherQuery.status === 'loading' || !weatherQuery.data || !cityQuery.data ? (
        <WeatherSkeleton />
      ) : (
        <div className={styles.container}>
          <CurrentWeather
            city={cityQuery.data!}
            daily={weatherQuery.data.daily[0]}
            current={weatherQuery.data.current}
          />
          <Space h="md" />
          <Forecast forecast={weatherQuery.data!.daily.slice(1, 6)} />
        </div>
      )}
      <Modal
        size="lg"
        opened={!!location.error}
        centered
        radius="md"
        withCloseButton={false}
        shadow="xs"
        padding={0}
        onClose={() => {}}
      >
        <Alert
          variant="filled"
          icon={<FaExclamationTriangle />}
          title={t('geoErrorTitle')}
          color="red"
        >
          <Text>{t('geoError')}</Text>
        </Alert>
      </Modal>
    </>
  );
}
