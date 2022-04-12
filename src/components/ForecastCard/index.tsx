import { useMantineTheme, Card, Center, Text } from '@mantine/core';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useUnit } from '@/hooks/useUnit';
import { DailyForecast } from '@/types';
import { convertTemperature } from '@/utils/convertTemperature';
import { resolveIcon } from '@/utils/resolveIcon';

/**
 * A singular forecast card depicting the day, weather icon, min, and max temperatures.
 */
export function ForecastCard({ forecast }: { forecast: DailyForecast }): ReactElement {
  const theme = useMantineTheme();
  const { unit } = useUnit();
  const { t, i18n } = useTranslation();

  const date = new Date(forecast.dt * 1000);
  const Icon = resolveIcon(forecast.weather[0].icon);

  return (
    <Card withBorder shadow="xs" radius="md" key={forecast.dt}>
      <Text weight="bold" align="center" transform="capitalize" title={date.toLocaleString()}>
        {date.toLocaleDateString(i18n.language, { weekday: 'long' })}
      </Text>
      <Center>
        <Icon
          color={theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[7]}
          title={forecast.weather[0].description}
          size={70}
        />
      </Center>
      <Text align="center">
        {t('min')}: {Math.round(convertTemperature(forecast.temp.min, unit))}°{unit}
      </Text>
      <Text align="center">
        {t('max')}: {Math.round(convertTemperature(forecast.temp.max, unit))}°{unit}
      </Text>
    </Card>
  );
}
