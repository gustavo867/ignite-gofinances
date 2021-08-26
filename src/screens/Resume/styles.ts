import styled from "styled-components/native";

export const Container = styled.View``;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
  },
})`
  flex-grow: 1;
`;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;
