import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import * as S from "./styles";

interface CategorySelectButtonProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

function CategorySelectButton(props: CategorySelectButtonProps) {
  return (
    <S.Container testID={props.testID} onPress={props.onPress}>
      <S.Category>{props.title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
}

export { CategorySelectButton };
