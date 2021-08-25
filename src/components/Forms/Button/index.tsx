import React from "react";

import { Text, TouchableOpacityProps } from "react-native";

import * as S from "./styles";

interface Props extends TouchableOpacityProps {
  title: string;
}

function Button({ title, ...rest }: Props) {
  return (
    <S.Container {...(rest as any)}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}

export { Button };
