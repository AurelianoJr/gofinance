import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled(BorderlessButton)`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding-vertical: 18px;
  align-items: center;
  border-radius: 5px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-weight: 500;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.shape};
  line-height: 21px;
`;
