import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { AnyStyledComponent } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({ activeOpacity: 0.7 })`
  background-color: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  padding: 18px 8px 18px 16px;
  border-radius: 5px;
`;

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-weight: 400;
  font-size: ${RFValue(14)}px;
  line-height: 21px;

  color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather as unknown as AnyStyledComponent)`
  font-size: ${() => RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`;
