import { TouchableOpacityProps } from 'react-native';

export interface Category {
  key: string;
  name: string;
  icon: string;
  color: string;
}

export interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeCategorySelect: () => void;
}

export interface TouchableContainerProps extends TouchableOpacityProps {
  isSelected: boolean;
}
