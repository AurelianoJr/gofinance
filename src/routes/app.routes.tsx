import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Register } from "../screens/Register";
import { Dashboard } from "../screens/Dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { Resume } from "../screens/Resume";
import { useTheme } from "styled-components/native";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const { Screen, Navigator } = createBottomTabNavigator();

interface TabItemsProps {
  [props: string]: {
    icon: string;
    name: string;
  };
}

export type AppStackParamList = {
  Dashboard: undefined;
  Register: undefined;
  Resume: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              size={size}
              color={color}
              name="format-list-bulleted"
            />
          ),
        }}
      />
      <Screen
        name="Register"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons size={size} color={color} name="attach-money" />
          ),
        }}
      />
      <Screen
        name="Resume"
        component={Resume}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons size={size} color={color} name="pie-chart" />
          ),
        }}
      />
    </Navigator>
  );
}
