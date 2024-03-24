import { configureStore } from "@reduxjs/toolkit";
import taskListSlice from "store/taskListSlice";

const store = configureStore({
  reducer: taskListSlice,
});
export default store;

store.subscribe(() => console.log(store.getState()));
