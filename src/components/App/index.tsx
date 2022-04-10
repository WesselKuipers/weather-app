import { QueryClient, QueryClientProvider } from 'react-query';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
  Paper,
} from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import { Weather, Settings } from '@/components';
import styles from './index.module.css';

const queryClient = new QueryClient();

/**
 * The entrypoint of the app.
 *
 * Themes and providers are initialized here.
 */
export function App() {
  // Fetch, store, and apply the preferred colour scheme, using the prefers-color-scheme media query.
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  const theme: MantineThemeOverride = {
    colorScheme,
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Paper p="md" radius={0} className={styles.container}>
            <Settings />
            <Weather />
          </Paper>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
