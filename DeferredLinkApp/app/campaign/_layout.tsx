import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import CampaignScreen from './[...routes]'

import { useColorScheme } from '@/hooks/useColorScheme';


export default function CampaignLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CampaignScreen />
    </ThemeProvider>
  );
}
