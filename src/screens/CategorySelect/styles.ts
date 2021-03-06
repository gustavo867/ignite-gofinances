import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import {
  GestureHandlerRootView,
  RectButton,
} from "react-native-gesture-handler";

type IsActive = {
  isActive: boolean;
};

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.backgroumd};
`;

export const Category = styled(RectButton)<IsActive>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary_light : theme.colors.backgroumd};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${(props) =>
    props.theme.name === "light"
      ? props.theme.colors.text_dark
      : props.theme.colors.text};
  margin-right: 16px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${(props) =>
    props.theme.name === "light"
      ? props.theme.colors.text_dark
      : props.theme.colors.text};
  font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
