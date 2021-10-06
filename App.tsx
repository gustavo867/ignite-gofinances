import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./src/routes/app.routes";
import { AuthProvider } from "./src/hooks/auth";
import { ThemeProvider } from "./src/context/ThemeContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider>
      <StatusBar style="light" translucent />
      <NavigationContainer>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
