import { TouchableOpacityProps } from 'react-native';
import { Category } from '../../screens/CategorySelect/CategorySelect.types';

export interface CategoryProps extends TouchableOpacityProps {
  category: Category;
  isSelected: boolean;
}
