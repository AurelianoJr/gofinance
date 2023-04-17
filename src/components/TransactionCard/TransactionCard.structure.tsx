import React from "react";
import { Props } from "./TransactionCard.types";
import * as S from "./TransactionCard.style";
import { categories } from "../../utils/categories";

export function TransactionCard({ data }: Props) {
  const categorySelected = categories.find(
    (category) => category.key === data.category
  );

  return (
    <S.Container>
      <S.Title>{data.name}</S.Title>
      <S.Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </S.Amount>
      <S.Footer>
        <S.Category>
          <S.Icon name={categorySelected?.icon} />
          <S.CategoryName>{categorySelected?.name}</S.CategoryName>
        </S.Category>
        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}
