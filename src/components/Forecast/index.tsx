import { ReactElement } from 'react';
import { Grid } from '@mantine/core';
import { DailyForecast } from '@/types';
import { ForecastCard } from '@/components';

interface ForecastProps {
  /**
   * The list of daily forecasts.
   *
   * This should be filtered beforehand.
   */
  forecast: DailyForecast[];
}

/**
 * The container for the weekly forecast.
 */
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
