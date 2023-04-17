import React from 'react';
import * as S from './CategorySelectButton.styles';
import { CategorySelectButtonProps } from './CategorySelectButton.types';

export function CategorySelectButton({
  title,
  activeOpacity,
  ...rest
}: CategorySelectButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Category>{title}</S.Category>
      <S.Icon name='chevron-down' />
    </S.Container>
  );
}
