import React from "react";
import { TextInputProps } from "react-native";

import * as S from "./styles";

type Props = TextInputProps;

const Input: React.FC<Props> = ({ ...rest }) => {
  return <S.Container {...(rest as any)} />;
};

export { Input };
