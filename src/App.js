import "./App.css";
import { useState } from "react";
import { Themes } from "./components";
import Router from "./navigation/Router";
import { ThemeProvider } from "styled-components";

export default function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={Themes[theme]}>
      <Router />
    </ThemeProvider>
  );
}
