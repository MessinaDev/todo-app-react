import React, { useState } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import NewTodo from "./components/NewTodo";
import TaskList from "./components/TaskList";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(fetchThemeInLocalStorage());

  const theme = createTheme({
    palette: {
      mode: darkTheme,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header>
          <h1>My tasks</h1>
        </header>
        <IconButton
          className="ButtonTheme"
          onClick={() =>
            setDarkTheme((prev) => {
              const theme = prev === "dark" ? "light" : "dark";
              saveThemeInLocalStorage(theme);
              return theme;
            })
          }
        >
          {darkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <NewTodo />
        <TaskList />
      </div>
    </ThemeProvider>
  );
}

function saveThemeInLocalStorage(theme) {
  localStorage.setItem("theme", theme);
}
function fetchThemeInLocalStorage() {
  return localStorage.getItem("theme") || "dark";
}

