import styled from "styled-components/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { AnyStyledComponent } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const MonthSelect = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 40px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather as unknown as AnyStyledComponent)`
  color: ${({ color }) => color};
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
