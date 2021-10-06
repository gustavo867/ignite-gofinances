import React from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import * as S from "./styles";

interface Props extends TextInputProps {
  active?: boolean;
}

const Input: React.FC<Props> = ({ active = false, ...rest }) => {
  const theme = useTheme();

  return (
    <S.Container
      placeholderTextColor={
        theme.name === "dark" ? theme.colors.text : theme.colors.text
      }
      active={active}
      {...(rest as any)}
    />
  );
};

export { Input };
