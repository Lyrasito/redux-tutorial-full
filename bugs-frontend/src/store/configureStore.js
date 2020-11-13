import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";
import toast from "./middleware/toast";
import api from "./middleware/api";

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger("console"), api],
  });
}

//if you write your own middleware, it overwrites the default react-toolkit middleware (like thunk), so you have to import getDefaultMiddleware and put it at the front of the arraty
