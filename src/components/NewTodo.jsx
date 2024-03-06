import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import React from "react";

export default function NewTodo() {
  const styleContainer = {
    width: "100%",
    display: "flex",
  };
  const styleTextField = {
    // TODO: sistemare
    width: "100%",
    paddingRight: "10px",
  };

  return (
    <div style={styleContainer}>
      <TextField
        style={styleTextField}
        id="outlined-basic"
        label="new task.."
        variant="outlined"
      />
      <Fab color="primary" aria-label="add" sx={{ ml: 2 }}>
        <AddIcon />
      </Fab>
    </div>
  );
}
