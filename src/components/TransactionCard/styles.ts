import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

type TypeProps = {
  type: "positive" | "negative" | string;
};

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 5px;

  padding: 17px 24px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const TrashButton = styled.TouchableOpacity.attrs({
  hitSlop: {
    left: RFValue(50),
    right: RFValue(50),
    top: RFValue(50),
    bottom: RFValue(50),
  },
})`
  position: absolute;
  top: 10px;
  right: 10px;
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
  align-items: center;
  justify-content: center;
`;

export const TrashIcon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${(props) => props.theme.colors.text};
`;

export const Amount = styled.Text<TypeProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) =>
    props.type === "positive"
      ? props.theme.colors.success
      : props.theme.colors.attention};
  margin-top: 2px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${(props) => props.theme.colors.text};
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-left: 17px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
`;
