import styled from 'styled-components/native';
import { TextInput as RNTextInput } from 'react-native';
import { TextInputProps } from './TextInput.types';
import { RFValue } from 'react-native-responsive-fontsize';

export const TextInput = styled(RNTextInput)<TextInputProps>`
  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.textDark};

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
`;
