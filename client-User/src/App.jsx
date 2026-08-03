import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  useEffect(() => {
    const getResponse = async () => {
      const response = await fetch("/api/", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
    };

    getResponse();
  }, []);
}

export default App;
