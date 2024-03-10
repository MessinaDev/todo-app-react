import React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import Fab from "@mui/material/Fab";
import { format } from "date-fns";

export default function TaskList({ tasks }) {
  const listItems = tasks.map((t) => {
    return (
      <ListItem key={t.id}>
        <ListItemText
          primary={t.text}
          secondary={`Creation date: ${format(
            new Date(t.date),
            "yyyy-MM-dd HH:mm:ss"
          )}`}
        ></ListItemText>
        <Fab color="error" aria-label="delete" sx={{ ml: 2 }}>
          <DeleteIcon />
        </Fab>
        <Fab color="secondary" aria-label="done" sx={{ ml: 4 }}>
          <DoneIcon />
        </Fab>
      </ListItem>
    );
  });

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <h2>To complete</h2>
        <List>{listItems}</List>
      </Box>
    </>
  );
}
