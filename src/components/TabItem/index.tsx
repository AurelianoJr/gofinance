import React from 'react';
import * as S from './TabItem.styles';
import { TabItemProps } from './TabItem.types';

export function TabItem({ name, icon, isActived }: TabItemProps) {
  return (
    <S.Container>
      <S.Icon name={icon} isActived={isActived} />
      <S.ScreenName isActived={isActived}>{name}</S.ScreenName>
    </S.Container>
  );
}
