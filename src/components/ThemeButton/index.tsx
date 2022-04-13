import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { WiDaySunny, WiMoonAltWaxingCrescent4 } from 'react-icons/wi';

/**
 * A button that can be used to toggle between light and dark themes.
 */
export function ThemeButton(): ReactElement {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { t } = useTranslation();

  return (
    <ActionIcon
      variant="outline"
      color={colorScheme === 'dark' ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title={t('toggleTheme')}>
      {colorScheme === 'dark' ? <WiDaySunny size={18} /> : <WiMoonAltWaxingCrescent4 size={18} />}
    </ActionIcon>
  );
}
