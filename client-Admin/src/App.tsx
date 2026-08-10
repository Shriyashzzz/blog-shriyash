import "@radix-ui/themes/styles.css";
import "./App.css";
import { Outlet } from "react-router";
import { Theme } from "@radix-ui/themes";
import { Header } from "./components/Header";

function App() {
  return (
    <Theme appearance="light">
      <Header />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </Theme>
  );
}

export default App;
