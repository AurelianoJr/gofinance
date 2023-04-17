import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const CategoryItemContainer = styled.View``;

export const CategoryItemText = styled.Text``;

export const Footer = styled.View`
  padding-horizontal: 24px;
  padding-bottom: 24px;
  margin-bottom: 24px;
`;

export const SecondaryButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  margin-bottom: 16px;
  align-items: center;
`;

export const SecondaryButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
`;
