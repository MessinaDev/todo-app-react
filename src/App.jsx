import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import NewTodo from "./components/NewTodo";
import TaskList from "./components/TaskList";

import { useSelector } from "react-redux";

export default function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const tasks = useSelector((state) => {
    console.log("state", state);
    return state.tasks;
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <header>
          <h1>My tasks</h1>
        </header>
        <NewTodo />
        <TaskList tasks={tasks} />
      </div>
    </ThemeProvider>
  );
}

