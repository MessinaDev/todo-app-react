import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "taskList",
  initialState: {
    tasks: [
      {
        id: 1234,
        text: "Initial task",
        date: new Date(),
        completed: false,
      },
    ],
  },
  reducers: {
    fetchTasks: ({ tasks }) => {
      // TODO:
      // tasks = tasks;
    },
    addTask: ({ tasks }, action) => {
      tasks.push(action.payload);
    },
    deleteTask: ({ tasks }, action) => {
      const index = tasks.indexOf(({ id }) => id === action.payload);
      if (index < 0) {
        throw new Error(`ID ${action.payload} not found`);
      }
      tasks.splice(index, 1);
    },
  },
});

const store = configureStore({
  reducer: slice.reducer,
});

export const { addTask, deleteTask, fetchTasks } = slice.actions;
console.log("slice", slice);

store.subscribe(() => console.log(store.getState()));
console.log("slice", slice);
