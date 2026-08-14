import { createSlice } from "@reduxjs/toolkit";
import isAuthenticated from "../../../server/src/controllers/authController/isAuthenticated";

interface User {
  id: number;
  username: string;
  role: "Member" | "Admin";
}

export interface authStateType {
  isAuthenticated: boolean;
  user?: User;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: { value: { isAuthenticated: false, user: null } },
  reducers: {
    isAuth: (state, action) => {
      state.value = { isAuthenticated: true, user: action.payload };
    },
    isNotAuth: (state) => {
      state.value = { isAuthenticated: false, user: null };
    },
  },
});

export const { isAuth, isNotAuth } = authSlice.actions;
