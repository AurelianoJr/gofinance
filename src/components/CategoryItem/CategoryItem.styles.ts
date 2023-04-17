import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { AnyStyledComponent } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableContainerProps } from '../../screens/CategorySelect/CategorySelect.types';

export const Container = styled.TouchableOpacity<TouchableContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(15)}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.secondaryLight : 'transparent'};
`;

export const Icon = styled(Feather as unknown as AnyStyledComponent)`
  color: ${({ color }) => color};
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

export const Text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.text};
`;
