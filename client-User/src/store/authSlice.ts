import { createSlice } from "@reduxjs/toolkit";

const checkIfAuthenticated = async () => {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
  });
  console.log(response);
  if (!response.ok) return false;
  return true;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { value: await checkIfAuthenticated() },
  reducers: {
    isAuth: (state) => {
      state.value = true;
    },
    isNotAuth: (state) => {
      state.value = false;
    },
  },
});

export const { isAuth, isNotAuth } = authSlice.actions;
