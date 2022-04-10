import { ReactElement } from 'react';
import { Card, Text, Center, Grid } from '@mantine/core';
import { DailyForecast } from '@/types';
import { resolveIcon } from '@/utils/resolveIcon';

interface ForecastProps {
  forecast: DailyForecast[];
}

function ForecastCard({ forecast }: { forecast: DailyForecast }): ReactElement {
  const date = new Date(forecast.dt * 1000);
  const Icon = resolveIcon(forecast.weather[0].icon);

  return (
    <Card withBorder shadow="xs" radius="md" key={forecast.dt}>
      <Text weight="bold" align="center" title={date.toLocaleString()}>
        {date.toLocaleDateString('en-US', { weekday: 'long' })}
      </Text>
      <Center>
        <Icon title={forecast.weather[0].description} color="#FFFFFF" size={70} />
      </Center>
      <Text align="center">Min: {Math.round(forecast.temp.min)}°C</Text>
      <Text align="center">Max: {Math.round(forecast.temp.max)}°C</Text>
    </Card>
  );
}

export function Forecast({ forecast }: ForecastProps): ReactElement {
  return (
    <Grid columns={15} justify="center">
      {forecast.map((day) => (
        <Grid.Col key={day.dt} lg={3} md={6} sm={6} xs={4}>
          <ForecastCard key={day.dt} forecast={day} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
