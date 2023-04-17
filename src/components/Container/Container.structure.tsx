import React from 'react';
import { Container as SCContainer } from './Container.styles';
import { ContainerProps } from './Container.types';

export function Container({ children }: ContainerProps) {
  return <SCContainer>{children}</SCContainer>;
}
