import { configureStore } from "@reduxjs/toolkit";
import { authSlice, authStateType } from "./authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = {
  auth: { value: authStateType };
};

export type AppDispatch = typeof store.dispatch;
export default store;
