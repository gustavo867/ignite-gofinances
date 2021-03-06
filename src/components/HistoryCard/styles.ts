import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

type Color = {
  color: string;
};

export const Container = styled.View<Color>`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  justify-content: space-between;

  padding: 13px 24px;

  border-radius: 5px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};

  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${(props) =>
    props.theme.name === "light"
      ? props.theme.colors.text_dark
      : props.theme.colors.text};
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
  color: ${(props) =>
    props.theme.name === "light"
      ? props.theme.colors.text_dark
      : props.theme.colors.text};
`;
