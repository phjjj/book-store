import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./style/global";
import { ThemeContext, state } from "./context/themeContext";

async function monuntApp() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mock/browser");
    await worker.start();
  }

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <ThemeContext.Provider value={state}>
        <App />
      </ThemeContext.Provider>
    </React.StrictMode>
  );
}

monuntApp();
