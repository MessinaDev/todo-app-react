import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTasksFromStore,
  addTaskToStore,
  deleteTaskInStore,
  markAsCompletedInStore,
  markAsUncompletedInStore,
} from "api";

export const fetchTasks = createAsyncThunk("taskList/fetchTasks", async () => {
  const t = (await fetchTasksFromStore()) || [];
  return t;
});

export const addTask = createAsyncThunk("taskList/addTask", async (task) => {
  return await addTaskToStore(task);
});

export const deleteTask = createAsyncThunk(
  "taskList/deleteTask",
  async (id) => {
    return await deleteTaskInStore(id);
  }
);

export const markAsCompleted = createAsyncThunk(
  "taskList/markAsCompleted",
  async (id) => {
    return await markAsCompletedInStore(id);
  }
);

export const markAsUncompleted = createAsyncThunk(
  "taskList/markAsUncompletedInStore",
  async (id) => {
    return await markAsUncompletedInStore(id);
  }
);

const taskListSlice = createSlice({
  name: "taskList",
  initialState: {
    tasks: [],
    isLoading: false,
    hasError: false,
  },

  reducers: {},

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

    builder.addCase(addTask.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(addTask.fulfilled, (state, { payload }) => {
      state.tasks.push(payload);
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(addTask.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      const index = findIndexTask(state.tasks, payload);
      state.tasks.splice(index, 1);
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(deleteTask.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });

    builder.addCase(markAsCompleted.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(markAsCompleted.fulfilled, (state, { payload }) => {
      const index = findIndexTask(state.tasks, payload.id);
      state.tasks[index] = payload;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(markAsCompleted.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });

    builder.addCase(markAsUncompleted.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });
    builder.addCase(markAsUncompleted.fulfilled, (state, { payload }) => {
      const index = findIndexTask(state.tasks, payload.id);
      state.tasks[index] = payload;
      state.isLoading = false;
      state.hasError = false;
    });
    builder.addCase(markAsUncompleted.rejected, (state) => {
      state.isLoading = false;
      state.hasError = true;
    });
  },
});

export default taskListSlice.reducer;

function findIndexTask(tasks, id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index < 0) {
    console.error(`Task ${id} not found`);
    throw new Error(`Task ${id} not found`);
  }
  return index;
}
