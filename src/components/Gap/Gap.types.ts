import { ViewProps } from 'react-native';

export interface GapProps extends ViewProps {
  gapSize: number;
  gapDirection?: 'horizontal' | 'vertical';
  children: JSX.Element | JSX.Element[];
}
