import React from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { Routes } from "./src/routes";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { AuthProvider, useAuth } from "./src/hooks/auth";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const { userStorageLoading } = useAuth();
  if (!fontsLoaded || userStorageLoading) {
    SplashScreen.hideAsync();
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
