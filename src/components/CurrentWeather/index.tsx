import { ReactElement } from 'react';
import { Card, Title, Grid, Text, Center, useMantineTheme, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { WiRain, WiWindDeg } from 'react-icons/wi';
import { CityResponse, CurrentWeather as CurrentWeatherType, DailyForecast } from '@/types';
import { resolveIcon } from '@/utils/resolveIcon';
import { useUnit } from '@/hooks/useUnit';
import { convertTemperature } from '@/utils/convertTemperature';

interface CurrentWeatherProps {
  /**
   * The current weather, used to display the temperature and weather type.
   */
  current: CurrentWeatherType;

  /**
   * The daily forecast for today.
   */
  daily: DailyForecast;

  /**
   * The city of the forecast.
   */
  city: CityResponse;
}

/**
 * Component for displaying the current temperature, weather icon, date, city, wind, and chance of precipitation.
 */
export function CurrentWeather({ current, daily, city }: CurrentWeatherProps): ReactElement {
  const { t, i18n } = useTranslation();
  const { unit } = useUnit();
  const theme = useMantineTheme();
  const Icon = resolveIcon(current.weather[0].icon);
  const date = new Date(current.dt * 1000);

  return (
    <Card radius="xs" shadow="md" withBorder>
      <Grid align="center" gutter="xl">
        <Grid.Col span={4}>
          <Center>
            <Icon
              title={current.weather[0].description}
              color={theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[7]}
              size={150}
            />
          </Center>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text title={date.toLocaleString()}>{t('today')}</Text>
          <Title>
            {city.local_names[i18n.language] ?? city.name}, {city.country}
          </Title>
          <Text weight="bold" sx={{ fontSize: '26px' }}>
            {Math.round(convertTemperature(current.temp, unit))}
            <Text size="xl" sx={{ paddingLeft: '0.25rem', display: 'inline' }} color="dimmed">
              °{unit}
            </Text>
          </Text>
          <Text color="dimmed">
            {t('feelsLike', {
              temperature: `${Math.round(convertTemperature(current.feels_like, unit))}°${unit}`,
            })}
          </Text>
        </Grid.Col>
        <Grid.Col md={3} span={6}>
          <Card
            sx={{
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
            }}
            withBorder
            shadow="xs"
          >
            <Center>
              <Stack spacing={0}>
                <Text>{t('min')}:</Text>
                <Text>
                  {Math.round(convertTemperature(daily.temp.min, unit))}°{unit}
                </Text>
              </Stack>
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col md={3} span={6}>
          <Card
            sx={{
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
            }}
            withBorder
            shadow="xs"
          >
            <Center>
              <Stack spacing={0}>
                <Text>{t('max')}:</Text>
                <Text>
                  {Math.round(convertTemperature(daily.temp.max, unit))}°{unit}
                </Text>
              </Stack>
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col md={3} span={6}>
          <Card
            sx={{
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
            }}
            withBorder
            shadow="xs"
          >
            <Center>
              <Stack spacing={0}>
                <WiWindDeg
                  style={{ margin: '0 auto', transform: `rotate(-${current.wind_deg}deg)` }}
                  color={theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[7]}
                  size={50}
                />
                <Text align="center">
                  {Math.round(unit === 'C' ? current.wind_speed * 3.6 : 2.237)}{' '}
                  {t(unit === 'C' ? 'kph' : 'mph')}
                </Text>
              </Stack>
            </Center>
          </Card>
        </Grid.Col>
        <Grid.Col md={3} span={6}>
          <Card
            sx={{
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
            }}
            withBorder
            shadow="xs"
          >
            <Center>
              <Stack spacing={0}>
                <WiRain
                  size={50}
                  color={theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[7]}
                />
                <Text align="center">{daily.pop * 100}%</Text>
              </Stack>
            </Center>
          </Card>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
