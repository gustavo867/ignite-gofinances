import React from "react";
import { categories } from "../../utils/categories";

import * as S from "./styles";

type Category = {
  name: string;
  icon: string;
};

export type TransactionCardProps = {
  title: string;
  amount: string;
  id: string;
  date: string;
  type: "positive" | "negative" | string;
  categoryKey: string;
};

type Props = {
  data: TransactionCardProps;
};

function TransactionCard(props: Props) {
  const category = categories.find((c) => c.key === props.data.categoryKey);

  return (
    <S.Container>
      <S.Title>{props.data.title}</S.Title>

      <S.Amount type={props.data.type}>
        {props.data.type === "negative"
          ? `- ${props.data.amount.replace("R$", "R$ ")}`
          : props.data.amount.replace("R$", "R$ ")}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{props.data.date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}

export { TransactionCard };
