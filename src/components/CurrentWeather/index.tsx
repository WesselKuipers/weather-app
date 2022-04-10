import { ReactElement } from 'react';
import { Card, Title, Grid, Text, Center } from '@mantine/core';
import { CityResponse, CurrentWeather as CurrentWeatherType } from '@/types';
import { resolveIcon } from '@/utils/resolveIcon';

interface CurrentWeatherProps {
  current: CurrentWeatherType;
  city: CityResponse;
}

export function CurrentWeather({ current, city }: CurrentWeatherProps): ReactElement {
  const Icon = resolveIcon(current.weather[0].icon);
  const date = new Date(current.dt * 1000);

  return (
    <Card radius="md" shadow="lg">
      <Grid align="center" gutter="xl">
        <Grid.Col span={4}>
          <Center>
            <Icon title={current.weather[0].description} color="#FFFFFF" size={150} />
          </Center>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text title={date.toLocaleString()}>Today</Text>
          <Title>
            {city.name}, {city.country}
          </Title>
          <Text weight="bold" sx={{ fontSize: '26px' }}>
            {Math.round(current.temp)}
            <Text size="xl" sx={{ paddingLeft: '0.5rem', display: 'inline' }} color="dimmed">
              °C
            </Text>
          </Text>
          <Text color="dimmed">Feels like {Math.round(current.feels_like)}°C</Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
