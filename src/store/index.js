import { configureStore } from "@reduxjs/toolkit";
import taskListSlice from "store/reducers/taskListSlice";
import alertSlice from "store/reducers/alertSlice";

const store = configureStore({
  reducer: {
    taskList: taskListSlice,
    alert: alertSlice,
  },
});
export default store;

store.subscribe(() => console.log(store.getState()));
