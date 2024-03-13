import React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import Fab from "@mui/material/Fab";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { deleteTask, markAsCompleted } from "../store";

export default function TaskList({ tasks }) {
  const dispatch = useDispatch();

  function createListItem(listTasks) {
    return listTasks.map((t) => {
      return (
        <ListItem key={t.id}>
          <ListItemText
            style={{ textDecoration: t.completed ? "line-through" : "none" }}
            primary={t.text}
            secondary={`Creation date: ${format(
              new Date(t.date),
              "yyyy-MM-dd HH:mm:ss"
            )}`}
          ></ListItemText>
          <Fab
            color="error"
            aria-label="delete"
            sx={{ ml: 2 }}
            onClick={() => dispatch(deleteTask(t.id))}
          >
            <DeleteIcon />
          </Fab>
          {!t.completed && (
            <Fab
              color="secondary"
              aria-label="done"
              sx={{ ml: 4 }}
              onClick={() => dispatch(markAsCompleted(t.id))}
            >
              <DoneIcon />
            </Fab>
          )}
        </ListItem>
      );
    });
  }

  const { tasksToComplete, tasksCompleted } = splitTasksByCompleted(tasks);
  const listItemsToComplete = createListItem(tasksToComplete);
  const listItemsCompleted = createListItem(tasksCompleted);

  return (
    <>
      <Box sx={{ mt: 4 }}>
        <h2>To complete</h2>
        <List>{listItemsToComplete}</List>
        <h2>Completed</h2>
        <List>{listItemsCompleted}</List>
      </Box>
    </>
  );
}

function splitTasksByCompleted(tasks) {
  let tasksToComplete = [];
  let tasksCompleted = [];
  tasks.forEach((t) => {
    if (t.completed) {
      tasksCompleted.push(t);
    } else {
      tasksToComplete.push(t);
    }
  });

  return { tasksToComplete, tasksCompleted };
}
