import { ViewProps } from 'react-native';

export interface HighlightCardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: 'up' | 'down' | 'total';
}

export interface HighlightCardType {
  type: 'up' | 'down' | 'total';
}

export interface IconTypes {
  [x: string]: string;
}
