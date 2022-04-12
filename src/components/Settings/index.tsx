import { Group, SegmentedControl } from '@mantine/core';
import { ReactElement } from 'react';
import { ThemeButton } from '@/components';
import styles from './index.module.css';
import { LanguageSelect } from '../LanguageSelect';
import { useUnit } from '@/hooks/useUnit';

/**
 * A container for the bar at the top that displays the settings controls.
 */
export function Settings(): ReactElement {
  const { toggleUnit, unit } = useUnit();

  return (
    <div className={styles.container}>
      <Group>
        <LanguageSelect />
        <SegmentedControl
          radius="lg"
          value={unit}
          onChange={toggleUnit}
          data={[
            { label: '°C', value: 'C' },
            { label: '°F', value: 'F' },
          ]}
        />
        <ThemeButton />
      </Group>
    </div>
  );
}
