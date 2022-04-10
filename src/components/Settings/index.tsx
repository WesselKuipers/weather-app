import { Group, SegmentedControl } from '@mantine/core';
import { ReactElement } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { ThemeButton } from '@/components/ThemeButton';
import styles from './index.module.css';

/**
 * A container for the bar at the top that displays the settings controls.
 */
export function Settings(): ReactElement {
  const [unit, setUnit] = useLocalStorage<'C' | 'F'>({
    key: 'unit',
    defaultValue: 'C',
    getInitialValueInEffect: true,
  });

  const toggleUnit = () => {
    setUnit((currentState) => (currentState === 'C' ? 'F' : 'C'));
  };

  return (
    <div className={styles.settings}>
      <Group>
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
