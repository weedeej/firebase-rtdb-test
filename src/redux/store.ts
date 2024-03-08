import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import categoriesSlice from "./categoriesSlice";

export const store = configureStore({
  reducer: {
    menus: menuSlice,
    categories: categoriesSlice
  }
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;