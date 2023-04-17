import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

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

export const ContainerForm = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 24px;
`;

export const Fields = styled.View``;

export const ContainerTextInput = styled.View``;

export const ContainerTransactionType = styled.View`
  flex-direction: row;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const ContainerButton = styled.View``;

export const GapSm = styled.View`
  width: 8px;
`;

// /**
//  * @param {string} type - A prop responsible for define the type transaction
//  * @returns {{transactionResume: string}} - May use '@returns' as well as '@return'
//  */
// export function handleSelectTransactionType(type: 'up' | 'down'): string {
//   return '';
// }

// /**
//  * @return A number responsible for https://figma.com.br/hsl
//  */
// export function ab() {
//   return 's';
// }

// // Parameters may be declared in a variety of syntactic forms
// /**
//  * @param {string}  p1 - A string param.
//  * @param {string=} p2 - An optional param (Google Closure syntax)
//  * @param {string} [p3] - Another optional param (JSDoc syntax).
//  * @param {string} [p4="test"] - An optional param with a default value
//  * @returns {string} This is the result
//  */
// function stringsStringStrings({ p1, p2, p3, p4 }) {
//   // TODO
// }
