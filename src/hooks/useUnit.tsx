import { useLocalStorage } from '@mantine/hooks';
import { createContext, ReactElement, ReactNode, useContext, useMemo } from 'react';

/**
 * The supported units for temperature.
 */
export type Unit = 'C' | 'F';

interface UnitContext {
  /**
   * The currently selected unit.
   */
  unit: Unit;

  /**
   * Setter function for updating the unit.
   */
  setUnit: (val: Unit | ((prevState: Unit) => Unit)) => void;

  /**
   * Toggle between C and F units.
   */
  toggleUnit: () => void;
}

const Context = createContext<UnitContext>({
  unit: 'C',
  setUnit: () => {},
  toggleUnit: () => {},
});

/**
 * A hook that keeps track of the application’s selected unit.
 *
 * @returns - An object containing the selected unit, and a function for changing it.
 */
export function useUnit(): UnitContext {
  return useContext(Context);
}

/**
 * The context provider for the useUnit hook
 */
export function UnitProvider({ children }: { children: ReactNode }): ReactElement {
  const [unit, setUnit] = useLocalStorage<Unit>({
    key: 'unit',
    defaultValue: 'C',
    getInitialValueInEffect: true,
  });

  const toggleUnit = () => {
    setUnit((currentState) => (currentState === 'C' ? 'F' : 'C'));
  };

  const value = useMemo(() => ({ unit, setUnit, toggleUnit }), [unit]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
