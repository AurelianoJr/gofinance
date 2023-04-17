import { ViewComponent, ViewProps } from "react-native";
import { string } from "yup";
import { TransactionCardProps } from "../../components/TransactionCard/TransactionCard.types";

export interface DashboardProps extends ViewProps {
  title: string;
}

export interface DataListProps extends TransactionCardProps {
  id: number;
}

export interface HightLightData {
  amount: string;
  lastTransaction: string;
}
export interface HighlightDataProps {
  entries: HightLightData;
  expensive: HightLightData;
  total: HightLightData;
}
