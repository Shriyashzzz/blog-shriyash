import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

export function ThemeSync() {
  const theme = useSelector((state: RootState) => state.theme.value);
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return null;
}
