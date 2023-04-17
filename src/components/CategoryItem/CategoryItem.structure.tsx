import React from 'react';
import * as S from './CategoryItem.styles';
import { CategoryProps } from './CategoryItem.types';

export function CategoryItem({
  category: { color, icon, name },
  isSelected,
  ...rest
}: CategoryProps) {
  return (
    <S.Container isSelected={isSelected} {...rest}>
      <S.Icon color={color} name={icon} />
      <S.Text>{name}</S.Text>
    </S.Container>
  );
}
