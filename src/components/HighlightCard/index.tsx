import React from "react";

import * as S from "./styles";

type Props = {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
};

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

function HighlightCard(props: Props) {
  return (
    <S.Container type={props.type}>
      <S.Header>
        <S.Title type={props.type}>{props.title}</S.Title>
        <S.Icon name={icon[props.type]} type={props.type} />
      </S.Header>
      <S.Footer>
        <S.Amount type={props.type}>{props.amount}</S.Amount>
        <S.LastTransaction type={props.type}>
          {props.lastTransaction}
        </S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
}

export { HighlightCard };
