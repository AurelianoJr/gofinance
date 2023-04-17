import { BorderlessButtonProps } from "react-native-gesture-handler";

export interface ButtonProps extends BorderlessButtonProps {
  title: string;
  onPress: () => void;
}
