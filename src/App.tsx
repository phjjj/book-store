import { ThemeProvider } from "styled-components";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import { GlobalStyle } from "./style/global";
import { ThemeName, dark, getTheme, light } from "./style/theme";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { useContext, useState } from "react";
import { BookStoreThemeContextProvider, ThemeContext } from "./context/themeContext";

function App() {
  return (
    <BookStoreThemeContextProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeContextProvider>
  );
}

export default App;
