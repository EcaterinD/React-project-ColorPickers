import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  theme: "Light",
  switchTheme: () => {},
});

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("Light");

  const switchTheme = () => {
    if (theme === "Light") {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        switchTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
