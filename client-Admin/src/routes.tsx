import { createBrowserRouter } from "react-router";
import App from "./App";
import { LoginPage } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <LoginPage /> }],
  },
]);
