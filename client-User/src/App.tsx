import { Header } from "./components/Header";
import { MainContent } from "./Pages/MainContent.tsx";
import { RootState } from "./store/store.ts";
import { Theme } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { isAuth, isNotAuth } from "./store/authSlice.ts";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.value);
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(isAuth(data.user));
      } else {
        dispatch(isNotAuth());
      }
    };
    checkAuth();
  }, []);

  return (
    <>
      <Theme appearance={theme}>
        <Header />
        <MainContent />
      </Theme>
    </>
  );
}

export default App;
