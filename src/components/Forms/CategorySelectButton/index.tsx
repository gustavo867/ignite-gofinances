import React from "react";
import * as S from "./styles";

interface CategorySelectButtonProps {
  title: string;
  onPress: () => void;
}

function CategorySelectButton(props: CategorySelectButtonProps) {
  return (
    <S.Container onPress={props.onPress}>
      <S.Category>{props.title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
}

export { CategorySelectButton };
