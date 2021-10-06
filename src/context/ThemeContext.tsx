import React, { createContext, ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

interface IThemeContext {
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
