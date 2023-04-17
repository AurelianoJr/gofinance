import styled from 'styled-components/native';
import { GapProps } from './Gap.types';

const directions = {
  horizontal: (gapSize: number) => `padding-right: ${gapSize}px`,
  vertical: (gapSize: number) => `padding-bottom: ${gapSize}px`,
};

export const Container = styled.View<GapProps>`
  width: 100%;
  ${({ gapSize, gapDirection = 'vertical' }) =>
    directions[gapDirection](gapSize)}
`;
