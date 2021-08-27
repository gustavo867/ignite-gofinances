import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components";

import * as S from "./styles";

interface SignInSocialButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
  isLoading?: boolean;
}

function SignInSocialButton({
  title,
  svg: Svg,
  isLoading = false,
  ...rest
}: SignInSocialButtonProps) {
  const theme = useTheme();

  return (
    <S.Button {...rest}>
      {isLoading ? (
        <S.LoadingContainer>
          <ActivityIndicator color={theme.colors.secondary} size="large" />
        </S.LoadingContainer>
      ) : (
        <>
          <S.ImageContainer>
            <Svg />
          </S.ImageContainer>
          <S.Text>{title}</S.Text>
        </>
      )}
    </S.Button>
  );
}

export { SignInSocialButton };
