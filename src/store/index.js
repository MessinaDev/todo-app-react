import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
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

const store = configureStore({
  reducer: slice.reducer,
});
export default store;

export const {
  addTask,
  deleteTask,
  fetchTasks,
  markAsCompleted,
  markAsUncompleted,
} = slice.actions;

store.subscribe(() => console.log(store.getState()));

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
