import React from "react";
import { render } from "@testing-library/react-native";

import { Input } from "../../components/Forms/Input";
import { ThemeProvider } from "styled-components/native";

import theme from "../../global/styles/theme";

const Providers: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("Input Component", () => {
  it("must have specific border color when active", () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        active
        placeholder="email"
        keyboardType="email-address"
        autoCorrect={false}
      />,
      {
        wrapper: Providers,
      }
    );

    const inputComponent = getByTestId("input-email");

    expect(inputComponent.props.style[0].borderColor).toEqual("#E83F5B");
  });
});
