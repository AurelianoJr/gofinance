import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as S from "./TransactionButton.styles";
import { ButtonProps } from "./TransactionButton.types";

const ICONS = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export function TransactionButton({
  text,
  type,
  isActived,
  ...rest
}: ButtonProps) {
  return (
    <S.Container>
      <GestureHandlerRootView>
        <S.TouchableWithoutFeedback isActived={isActived} type={type} {...rest}>
          <S.ContainerButton>
            <S.ContainerIcon>
              <S.Icon name={ICONS[type]} type={type} />
            </S.ContainerIcon>
            <S.Text>{text}</S.Text>
          </S.ContainerButton>
        </S.TouchableWithoutFeedback>
      </GestureHandlerRootView>
    </S.Container>
  );
}
