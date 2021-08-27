import React from "react";
import { Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../hooks/auth";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";

import * as S from "./styles";

function SignIn() {
  const { signInWithGoogle, signInWithApple, isLoading } = useAuth();

  function handleSignInWithGoogle() {
    try {
      signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Nãp foi possível conectar a conta Google");
    }
  }

  function handleSignInWithApple() {
    try {
      signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Nãp foi possível conectar a conta Apple");
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
        </S.TitleWrapper>

        <S.Title>
          Controle suas{"\n"}finanças de forma{"\n"}muito simples
        </S.Title>

        <S.SignInTitle>
          Faça seu login com{"\n"}uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            onPress={handleSignInWithGoogle}
            title="Entrar com Google"
            isLoading={isLoading}
            svg={GoogleSvg}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={handleSignInWithApple}
              title="Entrar com Apple"
              svg={AppleSvg}
              isLoading={isLoading}
            />
          )}
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}

export { SignIn };
