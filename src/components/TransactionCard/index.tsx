import React from "react";

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
  type: "positive" | "negative";
  category: {
    icon: string;
    name: string;
  };
};

type Props = {
  data: TransactionCardProps;
};

function TransactionCard(props: Props) {
  return (
    <S.Container>
      <S.Title>{props.data.title}</S.Title>

      <S.Amount type={props.data.type}>
        {props.data.type === "negative"
          ? `- ${props.data.amount}`
          : props.data.amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={props.data.category.icon} />
          <S.CategoryName>{props.data.category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{props.data.date}</S.Date>
      </S.Footer>
    </S.Container>
  );
}

export { TransactionCard };
