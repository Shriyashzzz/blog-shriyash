import { createSlice } from "@reduxjs/toolkit";

const getDeviceTheme = (): "light" | "dark" => {
  const localTheme = localStorage.getItem("blog_shriyash_theme");

  if (localTheme === "light" || localTheme === "dark") return localTheme;
  const isDarkMode: boolean = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  if (isDarkMode) {
    localStorage.setItem("blog_shriyash_theme", "dark");
    return "dark";
  }
  localStorage.setItem("blog_shriyash_theme", "light");
  return "light";
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: { value: getDeviceTheme() },
  reducers: {
    switchTheme: (state) => {
      if (state.value == "light") {
        localStorage.setItem("blog_shriyash_theme", "dark");
        state.value = "dark";
      } else {
        localStorage.setItem("blog_shriyash_theme", "light");
        state.value = "light";
      }
    },
  },
});

export const { switchTheme } = themeSlice.actions;
