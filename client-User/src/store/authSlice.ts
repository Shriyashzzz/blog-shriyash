import { createSlice } from "@reduxjs/toolkit";
import isAuthenticated from "../../../server/src/controllers/authController/isAuthenticated";

const checkIfAuthenticated = async () => {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
  });
  if (!response.ok) return { isAuthenticated: false };
  const data = await response.json();
  return { isAuthenticated: true, user: data.user };
};

interface User {
  email: string;
  username: string;
}

export interface authStateType {
  isAuthenticated: boolean;
  user?: User;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: { value: await checkIfAuthenticated() },
  reducers: {
    isAuth: (state, action) => {
      state.value = { isAuthenticated: true, user: action.payload.user };
    },
    isNotAuth: (state) => {
      state.value = { isAuthenticated: false };
    },
  },
});

export const { isAuth, isNotAuth } = authSlice.actions;
