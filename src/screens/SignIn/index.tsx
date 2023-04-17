import React, { useContext } from "react";
import { Button } from "../../components/Button";
import * as S from "./styles";
import LogoIcon from "../../assets/logo.svg";
import { ActivityIndicator, Alert, StatusBar } from "react-native";
import { useAuth } from "../../hooks/auth";
import { useTheme } from "styled-components/native";

export function SignIn() {
  const { signInWithGoogle, signInWithApple, userStorageLoading } = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      console.log(error);
      Alert.alert("Não foi possível conectar com a conta Google");
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error: any) {
      console.log(error);
      Alert.alert("Não foi possível conectar com a conta Apple");
    }
  }

  return (
    <S.Container>
      <StatusBar barStyle="light-content" />
      <S.Content>
        <LogoIcon />
        <S.Title>gofinances</S.Title>
        <S.ContextText>
          Controle suas finanças de forma muito simples
        </S.ContextText>
        <S.LoginInstructions>
          Faça seu login com {`\n`}
          uma das contas abaixo
        </S.LoginInstructions>

        <Button
          onPress={handleSignInWithGoogle}
          title="Entrar com Google"
          type="google"
        />
        <S.Gap size={16} />
        <Button
          onPress={handleSignInWithApple}
          title="Entrar com Apple"
          type="apple"
        />
        {userStorageLoading && (
          <ActivityIndicator
            style={{ marginTop: 18 }}
            color={theme.colors.shape}
            size={"small"}
          />
        )}
      </S.Content>
      <S.ContainerUp />
      <S.ContainerDown />
    </S.Container>
  );
}
