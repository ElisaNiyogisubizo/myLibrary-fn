import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import bookReducer from "./bookSlice";

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
