import React, { useContext } from "react";
import { ThemeName } from "../../style/theme";
import { ThemeContext } from "../../context/themeContext";

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  return <div onClick={toggleTheme}>ThemeSwitcher</div>;
};

export default ThemeSwitcher;
