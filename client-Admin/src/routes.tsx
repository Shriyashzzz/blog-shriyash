import { createBrowserRouter } from "react-router";
import App from "./App";
import { LoginPage } from "./pages/Login";
import { Home } from "./pages/Home";
import ErrorPage from "./pages/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <LoginPage />,
        path: "/login",
      },
      {
        element: <ErrorPage />,
        path: "/error",
      },
    ],
  },
]);
