import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";
import { BorderlessButtonProps } from "react-native-gesture-handler";

export interface IconProps {
  name: string;
  color: string;
}

export interface ButtonProps extends BorderlessButtonProps {
  text: string;
  type: "up" | "down";
  isActived: boolean;
}

export interface ButtonStyleProps {
  type: "up" | "down";
  isActived: boolean;
}
