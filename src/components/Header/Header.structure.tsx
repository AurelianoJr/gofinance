import React from 'react';
import * as S from './Header.styles';
import { HeaderProps } from './Header.types';

export function Header({ title }: HeaderProps) {
  return (
    <S.Header>
      <S.Title>{title}</S.Title>
    </S.Header>
  );
}
