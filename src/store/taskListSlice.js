import { createSlice } from "@reduxjs/toolkit";

const taskListSlice = createSlice({
  name: "taskList",
  initialState: {
    tasks: fetchTasksInLocalStorage(),
  },
  reducers: {
    fetchTasks: ({ tasks }, action) => {
      tasks = action.payload;
    },
    addTask: ({ tasks }, action) => {
      tasks.push(action.payload);
      saveTasksInLocalStorage(tasks);
    },
    deleteTask: (state, action) => {
      // Fetch tasks before any operation..
      const tasks = fetchTasksInLocalStorage();
      const index = findIndexTask(tasks, action.payload);
      tasks.splice(index, 1);
      saveTasksInLocalStorage(tasks);
      state.tasks = tasks;
    },
    markAsCompleted: (state, action) => {
      // Fetch tasks before any operation..
      const tasks = fetchTasksInLocalStorage();
      const index = findIndexTask(tasks, action.payload);
      tasks[index].completed = true;
      saveTasksInLocalStorage(tasks);
      state.tasks = tasks;
    },
    markAsUncompleted: (state, action) => {
      // Fetch tasks before any operation..
      const tasks = fetchTasksInLocalStorage();
      const index = findIndexTask(tasks, action.payload);
      tasks[index].completed = false;
      saveTasksInLocalStorage(tasks);
      state.tasks = tasks;
    },
  },
});

export const {
  addTask,
  deleteTask,
  fetchTasks,
  markAsCompleted,
  markAsUncompleted,
} = taskListSlice.actions;

export default taskListSlice.reducer;

function findIndexTask(tasks, id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index < 0) {
    console.error(`Task ${id} not found`);
    throw new Error(`Task ${id} not found`);
  }
  return index;
}

function saveTasksInLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function fetchTasksInLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
