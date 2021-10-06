import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

type TypeProps = {
  type: "up" | "down" | "total";
};

export const Container = styled.View<TypeProps>`
  background-color: ${(props) =>
    props.type === "total"
      ? props.theme.colors.secondary
      : props.theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: ${RFValue(19)}px ${RFValue(23)}px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${(props) =>
    props.type === "total"
      ? props.theme.name === "dark"
        ? props.theme.colors.text_dark
        : props.theme.colors.shape
      : props.theme.colors.text_dark};
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;
  ${(props) =>
    props.type === "up" &&
    css`
      color: ${(props) => props.theme.colors.success};
    `};

  ${(props) =>
    props.type === "down" &&
    css`
      color: ${(props) => props.theme.colors.attention};
    `};

  ${(props) =>
    props.type === "total" &&
    css`
      color: ${(props) =>
        props.theme.name === "dark"
          ? props.theme.colors.text_dark
          : props.theme.colors.shape};
    `};
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${(props) =>
    props.type === "total"
      ? props.theme.name === "dark"
        ? props.theme.colors.text_dark
        : props.theme.colors.shape
      : props.theme.colors.text_dark};
  margin-top: ${RFValue(38)}px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${(props) =>
    props.type === "total"
      ? props.theme.name === "dark"
        ? props.theme.colors.text_dark
        : props.theme.colors.shape
      : props.theme.colors.text};
`;
