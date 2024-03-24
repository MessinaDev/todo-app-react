import React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";
import Fab from "@mui/material/Fab";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  markAsCompleted,
  markAsUncompleted,
} from "store/taskListSlice";
import Grid from "@mui/material/Grid";

export default function TaskList({ tasks }) {
  const dispatch = useDispatch();

  function createListItem(listTasks) {
    return listTasks.map((t) => {
      return (
        <ListItem key={t.id} style={{ paddingRight: 0, paddingLeft: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <ListItemText
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}
                primary={t.text}
                secondary={`Creation date: ${format(
                  new Date(t.date),
                  "yyyy-MM-dd HH:mm:ss"
                )}`}
              ></ListItemText>
            </Grid>
            <Grid item xs={1}>
              <Fab
                color="error"
                aria-label="delete"
                sx={{ mr: 2 }}
                onClick={() => dispatch(deleteTask(t.id))}
              >
                <DeleteIcon />
              </Fab>
            </Grid>

            <Grid item xs={1}>
              {!t.completed && (
                <Fab
                  color="secondary"
                  aria-label="done"
                  onClick={() => dispatch(markAsCompleted(t.id))}
                >
                  <DoneIcon />
                </Fab>
              )}
              {t.completed && (
                <Fab
                  color="secondary"
                  aria-label="undo"
                  onClick={() => dispatch(markAsUncompleted(t.id))}
                >
                  <UndoIcon />
                </Fab>
              )}
            </Grid>
          </Grid>
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
