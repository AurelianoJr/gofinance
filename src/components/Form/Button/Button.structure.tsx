import React from "react";
import { ButtonProps } from "./Button.types";
import * as S from "./Button.styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";

export function Button({ title, onPress, ...rest }: ButtonProps) {
  return (
    <View>
      <GestureHandlerRootView>
        <S.Container onPress={onPress} {...rest}>
          <S.Text>{title}</S.Text>
        </S.Container>
      </GestureHandlerRootView>
    </View>
  );
}
