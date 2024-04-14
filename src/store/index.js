import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import taskListSlice from "store/reducers/taskListSlice";
import alertSlice from "store/reducers/alertSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    taskList: taskListSlice,
    alert: alertSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;

// store.subscribe(() => console.log(store.getState()));
