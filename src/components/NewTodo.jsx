import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addTask } from "../store";

export default function NewTodo() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const styleContainer = {
    width: "100%",
    display: "flex",
  };
  const styleTextField = {
    // TODO: sistemare
    width: "100%",
    paddingRight: "10px",
  };

  function addTodo() {
    if (text) {
      dispatch(addTask(createNewTodo()));
      setText("");
    }
  }

  function createNewTodo() {
    return {
      id: Date.now(),
      text,
      date: new Date(),
      completed: false,
    };
  }

  return (
    <div style={styleContainer}>
      <TextField
        style={styleTextField}
        id="outlined-basic"
        label="new task.."
        variant="outlined"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <Fab
        color="primary"
        aria-label="add"
        sx={{ ml: 2 }}
        onClick={() => addTodo()}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
