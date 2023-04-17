import React from 'react';
import { View } from 'react-native';
import { GapProps } from './Gap.types';
import * as S from './Gap.styles';

export function Gap({ gapSize, gapDirection, children }: GapProps) {
  function getComponentWithGap(component: JSX.Element, key: number) {
    return (
      <S.Container key={key} gapDirection={gapDirection} gapSize={gapSize}>
        {component}
      </S.Container>
    );
  }

  function isLastComponent(index: number) {
    if (!Array.isArray(children)) return;
    return index === children.length - 1;
  }

  function applyGap(): JSX.Element | JSX.Element[] {
    if (!Array.isArray(children)) return children;

    return children.map((component: any, index: number) => {
      if (isLastComponent(index)) return component;
      return getComponentWithGap(component, index);
    });
  }

  return <>{applyGap()}</>;
}
