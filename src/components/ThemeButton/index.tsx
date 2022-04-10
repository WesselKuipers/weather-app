import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { ReactElement } from 'react';
import { WiDaySunny, WiMoonAltWaxingCrescent4 } from 'react-icons/wi';

export function ThemeButton(): ReactElement {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      variant="outline"
      color={colorScheme === 'dark' ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme">
      {colorScheme === 'dark' ? <WiDaySunny size={18} /> : <WiMoonAltWaxingCrescent4 size={18} />}
    </ActionIcon>
  );
}
