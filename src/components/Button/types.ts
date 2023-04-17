import { TouchableOpacityProps as RNTouchableOpacity } from "react-native";

export interface TouchableButton extends RNTouchableOpacity {
  title: string;
  type: "google" | "apple";
}
