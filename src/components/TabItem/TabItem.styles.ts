import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { AnyStyledComponent } from 'styled-components';
import { IsActivedTabBar } from './TabItem.types';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  ${({ theme }) => theme.colors.text}
`;

export const Icon = styled(Feather as unknown as AnyStyledComponent)`
  color: ${({ theme, isActived }) =>
    isActived ? theme.colors.secondary : theme.colors.text};
  font-size: ${RFValue(20)}px;
  margin-right: 16px;
`;

export const ScreenName = styled.Text<IsActivedTabBar>`
  color: ${({ theme, isActived }) =>
    isActived ? theme.colors.secondary : theme.colors.text};
`;
