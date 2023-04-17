export interface TransactionTypeProps {
  type: "positive" | "negative";
}

export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

export interface Props {
  data: TransactionCardProps;
}
