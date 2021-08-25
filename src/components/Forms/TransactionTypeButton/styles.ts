import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

type IconProps = {
  type: "up" | "down";
};

type ContainerProps = {
  isActive: boolean;
  type: "up" | "down";
};

export const Wrapper = styled.View<ContainerProps>`
  width: 48%;

  border: 1.5px solid ${(props) => props.theme.colors.text};
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type }) =>
    isActive &&
    type == "up" &&
    css`
      border: 0px;
      background-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type == "down" &&
    css`
      border: 0px;
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;
