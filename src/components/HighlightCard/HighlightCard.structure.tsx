import React from 'react';
import * as S from './HighlightCard.styles';
import { HighlightCardProps } from './HighlightCard.types';

const IconByCardType = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
};

export function HighlightCard({
  title,
  amount,
  lastTransaction,
  type,
}: HighlightCardProps) {
  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title type={type}>{title}</S.Title>
        <S.Icon type={type} name={IconByCardType[type]} />
      </S.Header>
      <S.Footer>
        <S.Amount type={type}>{amount}</S.Amount>
        <S.LastTransaction type={type}>{lastTransaction}</S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
}
