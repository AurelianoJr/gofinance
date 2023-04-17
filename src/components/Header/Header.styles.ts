import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(133)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.shape};
`;
