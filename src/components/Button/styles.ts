import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  border-radius: 5px;
  width: 100%;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const ButtonContainer = styled.View`
  flex: 1;
  margin-left: 62px;
  justify-content: center;
  padding-vertical: 18px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.title};
`;

export const ContainerIcon = styled.View`
  width: 56px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;
