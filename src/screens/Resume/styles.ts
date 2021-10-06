import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroumd};
`;

export const Content = styled.ScrollView.attrs({})`
  flex-grow: 1;
  background-color: ${(props) => props.theme.colors.backgroumd};
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${(props) =>
    props.theme.name === "light"
      ? props.theme.colors.text_dark
      : props.theme.colors.text};
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${(props) =>
    props.theme.name === "light"
      ? props.theme.colors.text_dark
      : props.theme.colors.text};
  font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
