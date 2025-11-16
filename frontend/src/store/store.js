import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../components/MedicAcademic/ToDo/sliceTodo.js";
import researchReducer from "../components/MedicAcademic/Researchs/researchSlice.js";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    researchHeadTitles: researchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
