import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import { authSlice } from "./authSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = {
  theme: { value: "light" | "dark" };
  auth: { value: boolean };
};

export type AppDispatch = typeof store.dispatch;
export { store };
