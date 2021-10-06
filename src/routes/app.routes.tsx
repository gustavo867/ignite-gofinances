import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { Resume } from "../screens/Resume";
import { useAuth } from "../hooks/auth";
import { AuthRoutes } from "./auth.routes";
import { ThemeProvider } from "styled-components/native";
import { ThemeContext } from "../context/ThemeContext";

import lightTheme from "../global/styles/theme";
import darkTheme from "../global/styles/dark";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { theme: currentTheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const theme = currentTheme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
      {user.id ? (
        <Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: theme.colors.text,
            tabBarLabelPosition: "beside-icon",
            headerShown: false,
            tabBarStyle: {
              paddingVertical: Platform.OS === "ios" ? 20 : 0,
              height: 88,
              backgroundColor: theme.colors.backgroumd,
            },
            tabBarHideOnKeyboard: true,
          }}
        >
          <Screen
            name="Listagem"
            component={Dashboard}
            options={{
              tabBarIcon: ({ size, color, focused }) => (
                <MaterialIcons
                  name="format-list-bulleted"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Screen
            name="Cadastro"
            component={Register}
            options={{
              tabBarIcon: ({ size, color, focused }) => (
                <MaterialIcons name="attach-money" size={size} color={color} />
              ),
            }}
          />
          <Screen
            name="Resumo"
            component={Resume}
            options={{
              tabBarIcon: ({ size, color, focused }) => (
                <MaterialIcons name="pie-chart" size={size} color={color} />
              ),
            }}
          />
        </Navigator>
      ) : (
        <AuthRoutes />
      )}
    </ThemeProvider>
  );
}
