import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { GapProp } from "./types";

export const Container = styled.View`
  flex: 1;
`;

export const ContainerUp = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 70%;
`;

export const ContainerDown = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 30%;
`;

export const Content = styled.View`
  height: 100%;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  justify-content: center;
  align-items: center;

  padding-horizontal: ${RFValue(32)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 40px;
  margin-top: 12px;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 18px;
`;

export const ContextText = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 30px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 80px;
`;

export const LoginInstructions = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: ${RFValue(24)}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 40px;
`;

export const Gap = styled.View<GapProp>`
  margin-top: ${({ size }) => size}px;
`;
