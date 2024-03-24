import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk("taskList/fetchTasks", async () => {
  const tasks = await fetchTasksInLocalStorage();
  return tasks;
});

const taskListSlice = createSlice({
  name: "taskList",
  initialState: {
    tasks: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
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
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
      state.tasks = [];
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchTasks.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const { addTask, deleteTask, markAsCompleted, markAsUncompleted } =
  taskListSlice.actions;

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
