import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";

export const store = configureStore({
  reducer: {
    menus: menuSlice
  }
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;