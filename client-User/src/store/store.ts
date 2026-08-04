import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});

export type RootState = { theme: { value: "light" | "dark" } };
export type AppDispatch = typeof store.dispatch;
export { store };
