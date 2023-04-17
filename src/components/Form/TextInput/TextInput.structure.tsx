import React from 'react';
import { TextInputProps } from './TextInput.types';
import * as S from './TextInput.styles';

export function TextInput({ ...rest }: TextInputProps) {
  return <S.TextInput {...rest} />;
}
