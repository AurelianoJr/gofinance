import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuth } from "../hooks/auth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./Auth.routes";

export function Routes() {
  const { userInfo } = useAuth();
  return (
    <NavigationContainer>
      {userInfo.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
