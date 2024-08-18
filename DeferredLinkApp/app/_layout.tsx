import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {Stack, useLocalSearchParams, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as Linking from 'expo-linking'
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Clipboard from 'expo-clipboard';
import {Platform} from "react-native";
import * as Application from 'expo-application';
import axios from "axios";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const parsePath = (pathStr: string) => {
  const [path, queryString] = pathStr.split('?');
  const params = new URLSearchParams(queryString);
  const queryObject = Object.fromEntries(params.entries());

  return {
    pathname: path,
    queryObject: queryObject
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const url = Linking.useURL();
  const router = useRouter();
  const params = useLocalSearchParams<any>()

  const getPath = async (code: string) => {
    const res = await axios.get(`http://localhost:4000/deferred-link?code=${code}`)
    return res.data.path
  }

  const getCode = async () => {
    if (Platform.OS === 'ios') {
      const s = await Clipboard.getStringAsync()
      if (s.includes('deferred-link-code=')) {
        return s.replace('deferred-link-code=', '')
      }
    }
    if (Platform.OS === 'android') {
      return await Application.getInstallReferrerAsync()
    }
    return undefined
  }

  const handleDeferredLink = async () => {
    const code = await getCode()
    if (code) {
      const path = await getPath(code)
      const { pathname, queryObject } = parsePath(path)
      router.replace({ pathname: `/${pathname}`, params: queryObject })
    }
  }

  console.log('url', url)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setTimeout(() => {
      handleDeferredLink()
    }, 1000)
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="campaign" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
