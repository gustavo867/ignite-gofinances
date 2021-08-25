import React from "react";

import * as S from "./styles";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}

export { Header };
