import React, { useState } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import NewTodo from "./components/NewTodo";
import TaskList from "./components/TaskList";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useSelector } from "react-redux";

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkTheme ? "dark" : "light",
    },
  });

  const tasks = useSelector((state) => {
    return state.tasks;
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
          onClick={() => setDarkTheme((prev) => !prev)}
        >
          {darkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <NewTodo />
        <TaskList tasks={tasks} />
      </div>
    </ThemeProvider>
  );
}

