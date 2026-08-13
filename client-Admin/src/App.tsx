import "@radix-ui/themes/styles.css";
import { Outlet } from "react-router";
import { Theme } from "@radix-ui/themes";
import { Header } from "./components/Header";

function App() {
  return (
    <Theme appearance="dark">
      <Header />
      <main className="w-full min-h-screen pb-20 flex justify-center">
        <Outlet />
      </main>
    </Theme>
  );
}

export default App;
