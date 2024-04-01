import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { addTask } from "store/reducers/taskListSlice";
import Grid from "@mui/material/Grid";
import { showAlert } from "store/reducers/alertSlice";

export default function NewTodo() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    addTodo();
  }

  function addTodo() {
    if (text) {
      dispatch(addTask(createNewTodo()));
      setText("");
      dispatch(
        showAlert({
          text: "Task added",
          type: "success",
          duration: 2000,
        })
      );
    }
  }

  function createNewTodo() {
    return {
      id: Date.now(),
      text,
      date: new Date().toISOString(),
      completed: false,
    };
  }

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              value={text}
              onChange={(event) => setText(event.target.value)}
              required
            />
          </Grid>
          <Grid item xs={1}>
            <Fab color="primary" aria-label="add" type="submit">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
