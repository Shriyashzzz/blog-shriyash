import { Header } from "./components/Header";
import { MainContent } from "./Pages/MainContent.tsx";
import { RootState } from "./store/store.ts";
import { Theme } from "@radix-ui/themes";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state: RootState) => state.theme.value);
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
