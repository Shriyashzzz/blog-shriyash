import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  role: "Member" | "Admin";
}

export interface authStateType {
  isAuthenticated: boolean;
  user?: User;
  isLoading: boolean;
}
const initialState: { value: authStateType } = {
  value: {
    isAuthenticated: false,
    user: undefined,
    isLoading: true,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    isAuth: (state, action) => {
      state.value = {
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };
    },
    isNotAuth: (state) => {
      state.value = { isAuthenticated: false, isLoading: false };
    },
  },
});

export const { isAuth, isNotAuth } = authSlice.actions;
