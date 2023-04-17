import React from "react";
import { TouchableButton } from "./types";
import * as S from "./styles";
import AppleIcon from "../../assets/apple.svg";
import GoogleIcon from "../../assets/google.svg";

const icons = {
  apple: <AppleIcon />,
  google: <GoogleIcon />,
};

export function Button({ title, onPress, type, ...rest }: TouchableButton) {
  return (
    <S.Container activeOpacity={0.9} onPress={onPress} {...rest}>
      <S.ContainerIcon>{icons[type]}</S.ContainerIcon>
      <S.ButtonContainer>
        <S.ButtonText>{title}</S.ButtonText>
      </S.ButtonContainer>
    </S.Container>
  );
}
