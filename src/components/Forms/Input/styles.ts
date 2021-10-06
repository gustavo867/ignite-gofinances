import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

type Props = {
  active: boolean;
};

export const Container = styled.TextInput<Props>`
  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};

  color: ${(props) =>
    props.theme.name === "dark"
      ? props.theme.colors.title
      : props.theme.colors.text_dark};
  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 5px;
  margin-bottom: 8px;

  ${({ active, theme }) =>
    active &&
    css`
      border-width: 3px;
      border-color: ${theme.colors.attention};
    `}
`;
