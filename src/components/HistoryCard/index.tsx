import React from "react";

import * as S from "./styles";

interface HistoryCardProps {
  title: string;
  amount: string;
  color: string;
}

function HistoryCard(props: HistoryCardProps) {
  return (
    <S.Container color={props.color}>
      <S.Title>{props.title}</S.Title>
      <S.Amount>{props.amount.replace("R$", "R$ ")}</S.Amount>
    </S.Container>
  );
}

export { HistoryCard };
