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
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.tasks = [];
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(fetchTasks.fulfilled, (state, { payload }) => {
      state.tasks = payload;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
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
