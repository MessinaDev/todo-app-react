import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";
import Fab from "@mui/material/Fab";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  markAsCompleted,
  markAsUncompleted,
} from "store/taskListSlice";
import Grid from "@mui/material/Grid";
import DateField from "./common/DatePicker";

export default function TaskList() {
  const tasks = useSelector((state) => state.tasks);
  const [filterDate, setFilterDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  function createListItem(listTasks) {
    const taskFiltered =
      filterDate && !isNaN(new Date(filterDate).getTime())
        ? filterTasksByDate(listTasks, filterDate)
        : listTasks;

    return taskFiltered.map((t) => {
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
                  "dd/MM/yyyy HH:mm:ss"
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
      <Box sx={{ mt: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <DateField
              label="Filter tasks by date"
              date={filterDate}
              changeDate={setFilterDate}
            />
          </Grid>
        </Grid>

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

function filterTasksByDate(listTasks, date) {
  const filterDateFormatted = formatDateToCompat(date);
  return listTasks.filter(
    ({ date }) => formatDateToCompat(date) === filterDateFormatted
  );
}

function formatDateToCompat(date) {
  const d = new Date(date);
  return isNaN(d.getTime()) ? null : format(d, "yyyyMMdd");
}
