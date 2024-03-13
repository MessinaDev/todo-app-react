import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "taskList",
  initialState: {
    tasks: [
      {
        id: 1234,
        text: "Initial task",
        date: new Date().toISOString(),
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
      const index = findIndexTask(tasks, action.payload);
      tasks.splice(index, 1);
    },
    markAsCompleted: ({ tasks }, action) => {
      const index = findIndexTask(tasks, action.payload);
      tasks[index].completed = true;
    },
  },
});

const store = configureStore({
  reducer: slice.reducer,
});
export default store;

export const { addTask, deleteTask, fetchTasks, markAsCompleted } =
  slice.actions;

store.subscribe(() => console.log(store.getState()));

function findIndexTask(tasks, id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index < 0) {
    throw new Error(`ID ${id} not found`);
  }
  return index;
}
