import styled, { css } from "styled-components/native";
import { AnyStyledComponent } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { ButtonStyleProps, IconProps } from "./TransactionButton.types";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
  width: 50%;
  border-width: ${({ isActived }) => (isActived ? 0 : 1.5)}px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.text};
`;

export const TouchableWithoutFeedback = styled(
  BorderlessButton
)<ButtonStyleProps>`
  align-items: center;

  ${({ theme, isActived, type }) =>
    isActived &&
    type === "up" &&
    css`
      background-color: ${theme.colors.successLight};
    `}

  ${({ theme, isActived, type }) =>
    isActived &&
    type === "down" &&
    css`
      background-color: ${theme.colors.attentionLight};
    `}
`;

export const ContainerButton = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 16px;
`;

export const ContainerIcon = styled.View`
  margin-right: 14px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: bold;
  font-size: ${RFValue(14)}px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather as unknown as AnyStyledComponent)`
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
  font-size: ${RFValue(24)}px;
`;
